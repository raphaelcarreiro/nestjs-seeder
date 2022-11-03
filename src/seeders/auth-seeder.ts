import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { UserApiEntity } from 'src/database/entities/typeorm/user-api.entity';
import { AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { LocationStockDocument } from 'src/database/schemas/mongoose/location-stock.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class AuthSeeder extends SeederAbstract<UserApiEntity> {
  private sellerId: number;

  constructor(
    @InjectRepository(UserApiEntity)
    private readonly repository: Repository<UserApiEntity>,

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

    console.log(AuthSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<UserApiEntity[]> {
    console.log(AuthSeeder.name, ': fetching');

    return await this.repository.find();
  }

  protected async store(entities: UserApiEntity[]): Promise<void> {
    const seller = await this.account
      .findOne({
        legacyCodigoDistribuidor: this.sellerId,
      })
      .exec();

    const payload = entities.map(entity => ({
      sku: entity.sku,
      accountLocationId: seller._id,
      total: entity.total,
      virtual: entity.virtual,
      virtual: 0,
      createdAt: entity.dataIntegracao,
      updatedAt: entity.dataUltimaImportacao,
    }));

    console.log(AuthSeeder.name, ': inserting');

    await this.model.insertMany(payload);

    console.log(AuthSeeder.name, ': completed\n');
  }
}
