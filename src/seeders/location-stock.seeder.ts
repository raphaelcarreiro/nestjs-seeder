import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { LocationStockEntity } from 'src/database/entities/typeorm/location-stock.entity';
import { LocationStockDocument } from 'src/database/schemas/mongoose/location-stock.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class LocationStockSeeder extends SeederAbstract<LocationStockEntity> {
  constructor(
    @InjectRepository(LocationStockEntity)
    private readonly repository: Repository<LocationStockEntity>,

    @InjectModel('LocationStockSchema')
    private readonly model: Model<LocationStockDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<LocationStockEntity[]> {
    console.log('Buscando registros...');

    return await this.repository.find();
  }

  protected async store(entities: LocationStockEntity[]): Promise<void> {
    let cont = 1;

    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.model.create({
        sku: entity.sku,
        legacyLocationId: entity.siteId,
        total: entity.total,
        reserved: entity.reservado,
        virtual: entity.virtual,
        createdAt: entity.dataIntegracao,
        updatedAt: entity.dataUltimaImportacao,
      });

      cont = cont + 1;
    }
  }
}
