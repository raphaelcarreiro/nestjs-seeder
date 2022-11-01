import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { LocationStockEntity } from 'src/database/entities/typeorm/location-stock.entity';
import { AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { LocationStockDocument } from 'src/database/schemas/mongoose/location-stock.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class LocationStockSeeder extends SeederAbstract<LocationStockEntity> {
  private sellerId: number;

  constructor(
    @InjectRepository(LocationStockEntity)
    private readonly repository: Repository<LocationStockEntity>,

    @InjectModel('AccountSchema')
    private readonly account: Model<AccountDocument>,

    @InjectModel('LocationStockSchema')
    private readonly model: Model<LocationStockDocument>,
  ) {
    super();

    this.sellerId = parseInt(process.env.LEGACY_LOCATION_ID);
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<LocationStockEntity[]> {
    console.log('Buscando registros...');

    return await this.repository.find({
      where: {
        siteId: parseInt(process.env.LEGACY_LOCATION_ID),
      },
    });
  }

  protected async store(entities: LocationStockEntity[]): Promise<void> {
    let cont = 1;

    const total = entities.length;

    const seller = await this.account
      .findOne({
        legacyCodigoDistribuidor: this.sellerId,
      })
      .exec();

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.model.create({
        sku: entity.sku,
        accountLocationId: seller._id,
        total: entity.total,
        virtual: entity.virtual,
        createdAt: entity.dataIntegracao,
        updatedAt: entity.dataUltimaImportacao,
      });

      cont = cont + 1;
    }
  }
}
