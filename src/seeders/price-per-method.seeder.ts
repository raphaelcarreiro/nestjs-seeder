import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectDataSource } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PricePerMethodEntity } from 'src/database/entities/typeorm/price-per-method.entity';
import { Account, AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { PaymentMethod } from 'src/database/schemas/mongoose/payment-method.schema';
import { PricePerMethod } from 'src/database/schemas/mongoose/price-per-method.schema';
import { DataSource } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class PricePerMethodSeeder extends SeederAbstract<PricePerMethodEntity> {
  private sellerId: number;
  private mongoPaymentMethods: PaymentMethod[];

  constructor(
    @InjectModel('AccountSchema')
    private readonly accountModel: Model<AccountDocument>,

    @InjectModel('PaymentMethodSchema')
    private readonly paymentMethodModel: Model<PricePerMethod>,

    @InjectModel('PricePerMethodSchema')
    private readonly mongooseModel: Model<PricePerMethod>,

    @InjectDataSource()
    private readonly connection: DataSource,
  ) {
    super();
    this.sellerId = parseInt(process.env.LEGACY_LOCATION_ID);
  }

  async execute() {
    this.mongoPaymentMethods = await this.paymentMethodModel.find();

    const entities = await this.find();

    console.log(PricePerMethodSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<any[]> {
    console.log(PricePerMethodSeeder.name, ': fetching');

    return await this.connection.query(`
      select PSTP.*, TP.Codigo as code
      from Produto_Site_TabelaPreco PSTP
      join TabelaPreco TP on PSTP.TabelaPrecoId = TP.TabelaPrecoId
      where PSTP.Preco > 0 and PSTP.sku <> '' and PSTP.SiteId = ${process.env.LEGACY_LOCATION_ID}
    `);
  }

  protected async store(entities: any[]): Promise<void> {
    const seller = await this.getSeller();

    const payload = entities.map(entity => {
      const paymentMethod = this.getPaymentMethod(entity.code);

      return {
        paymentMethodId: paymentMethod._id,
        accountLocationId: seller._id,
        sku: entity.Sku,
        price: entity.Preco,
        pricePolicyId: null,
      };
    });

    console.log(PricePerMethodSeeder.name, ': inserting');

    await this.mongooseModel.insertMany(payload);

    console.log(PricePerMethodSeeder.name, ': completed\n');
  }

  private async getSeller(): Promise<Account> {
    return await this.accountModel
      .findOne({
        legacyCodigoDistribuidor: this.sellerId,
      })
      .exec();
  }

  private getPaymentMethod(code: string) {
    return this.mongoPaymentMethods.find(item => item.code === code);
  }
}
