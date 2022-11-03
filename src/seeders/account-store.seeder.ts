import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { StoreEntity } from 'src/database/entities/typeorm/store.entity';
import { AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { In, Not, Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class AccountStoreSeeder extends SeederAbstract<StoreEntity> {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly sellerRepository: Repository<StoreEntity>,

    @InjectModel('AccountSchema')
    private readonly accountModel: Model<AccountDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(AccountStoreSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<StoreEntity[]> {
    console.log(AccountStoreSeeder.name, ': fetching');

    const mongoSellers = await this.accountModel.find({ accountType: 'account' }).exec();

    return await this.sellerRepository.find({
      where: {
        id: Not(In(mongoSellers.map(seller => seller.legacySiteId))),
      },
    });
  }

  protected async store(entities: StoreEntity[]): Promise<void> {
    const payload = entities.map(entity => this.getPayload(entity));

    console.log(AccountStoreSeeder.name, ': inserting');

    await this.accountModel.insertMany(payload);

    console.log(AccountStoreSeeder.name, ': completed\n');
  }

  private getPayload(entity: StoreEntity) {
    return {
      legacySiteId: entity.id,
      legacyDistribuidorID: entity.id,
      legacyCodigoDistribuidor: entity.id,
      accountIDs: [],
      accountType: 'account',
      siteUrl: entity.hubUrl,
      integration: [
        {
          type: 'all',
          url: entity.hubUrl,
          token: entity.token,
          username: entity.credential?.oAuthUsername ?? null,
          password: entity.credential?.oAuthPassword ?? null,
        },
      ],
      description: entity.name,
      active: entity.status,
      name: entity.name,
      fiscalCode: null,
      code: entity.code,
      onlyPricePolice: null,
    };
  }
}
