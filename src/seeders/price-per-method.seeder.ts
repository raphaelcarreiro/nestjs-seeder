import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PricePerMethodEntity } from 'src/database/entities/typeorm/price-per-method.entity';
import {
  Account,
  AccountDocument,
} from 'src/database/schemas/mongoose/account.schema';
import { PaymentMethod } from 'src/database/schemas/mongoose/payment-method.schema';
import { PricePerMethod } from 'src/database/schemas/mongoose/price-per-method.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class PricePerMethodSeeder extends SeederAbstract<PricePerMethodEntity> {
  private sellerId: number;
  private paymentMethods: PaymentMethod[];

  constructor(
    @InjectRepository(PricePerMethodEntity)
    private readonly repository: Repository<PricePerMethodEntity>,

    @InjectModel('AccountSchema')
    private readonly accountModel: Model<AccountDocument>,

    @InjectModel('PaymentMethodSchema')
    private readonly paymentMethodModel: Model<PricePerMethod>,

    @InjectModel('PricePerMethodSchema')
    private readonly model: Model<PricePerMethod>,
  ) {
    super();
    this.sellerId = parseInt(process.env.LEGACY_LOCATION_ID);
  }

  async execute() {
    this.paymentMethods = await this.paymentMethodModel.find();

    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<PricePerMethodEntity[]> {
    console.log('Buscando registros...');

    return await this.repository.find({
      where: {
        locationId: this.sellerId,
      },
    });
  }

  protected async store(entities: PricePerMethodEntity[]): Promise<void> {
    let cont = 1;

    const total = entities.length;

    const seller = await this.getSeller();

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.model.create({
        paymentMethodId: null,
        pricePolicyId: null,
        accountLocationId: seller._id,
        sku: entity.sku,
        price: entity.price,
      });

      cont = cont + 1;
    }
  }

  private async getSeller(): Promise<Account> {
    return await this.accountModel
      .findOne({
        legacyCodigoDistribuidor: this.sellerId,
      })
      .exec();
  }
}
