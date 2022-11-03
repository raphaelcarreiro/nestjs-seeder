import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model, Types } from 'mongoose';
import { SellerStoreEntity } from 'src/database/entities/typeorm/seller-store.entity';
import { SellerEntity } from 'src/database/entities/typeorm/seller.entity';
import { AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { In, Not, Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class AccountSellerSeeder extends SeederAbstract<SellerEntity> {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,

    @InjectModel('AccountSchema')
    private readonly accountModel: Model<AccountDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(AccountSellerSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<SellerEntity[]> {
    console.log(AccountSellerSeeder.name, ': fetching');

    const mongoSellers = await this.accountModel.find({ accountType: 'account' }).exec();

    return await this.sellerRepository.find({
      where: {
        id: Not(In(mongoSellers.map(seller => seller.legacyCodigoDistribuidor))),
      },
    });
  }

  protected async store(entities: SellerEntity[]): Promise<void> {
    const promises = entities.map(async entity => await this.getPayload(entity));

    const payload = await Promise.all(promises);

    console.log(AccountSellerSeeder.name, ': inserting');

    await this.accountModel.insertMany(payload);

    console.log(AccountSellerSeeder.name, ': completed\n');
  }

  private async getPayload(entity: SellerEntity) {
    return {
      legacySiteId: entity.id,
      legacyDistribuidorID: entity.id,
      legacyCodigoDistribuidor: entity.id,
      accountIDs: await this.getStoresId(entity.sellerStores),
      accountType: 'seller',
      siteUrl: null,
      integration: [
        {
          type: 'order',
          url: entity.orderEndpoint,
          username: entity.orderUsername,
          password: entity.orderPassword,
        },
        {
          type: 'customer',
          url: entity.customerEndpoint,
          username: entity.customerUsername,
          password: entity.customerPassword,
        },
        {
          type: 'payment',
          url: entity.paymentEndpoint,
          username: entity.paymentUsername,
          password: entity.paymentPassword,
        },
      ],
      description: entity.name,
      active: entity.status,
      name: entity.name,
      fiscalCode: null,
      code: null,
      onlyPricePolice: entity.usePolicyPrice,
    };
  }

  private async getStoresId(sellerStore: SellerStoreEntity[]): Promise<Types.ObjectId[]> {
    const promises = sellerStore
      .filter(item => item.status)
      .map(async store => {
        const mongoStore = await this.accountModel
          .findOne({ accountType: 'account', legacySiteId: store.storeId })
          .exec();
        return mongoStore?._id;
      })
      .filter(item => !!item);

    return await Promise.all(promises);
  }
}
