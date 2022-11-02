import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { CreditLimitReserveEntity } from 'src/database/entities/typeorm/credit-limit-reserve.entity';
import {
  Account,
  AccountDocument,
} from 'src/database/schemas/mongoose/account.schema';
import { CreditLimitReserveDocument } from 'src/database/schemas/mongoose/credit-limit-reserve.schema';
import { StockReserveDocument } from 'src/database/schemas/mongoose/stock-reserve.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class CreditLimitReserveSeeder extends SeederAbstract<CreditLimitReserveEntity> {
  private sellerId: number;
  private storeId: number;

  constructor(
    @InjectRepository(CreditLimitReserveEntity)
    private readonly typeormRepository: Repository<CreditLimitReserveEntity>,

    @InjectModel('AccountSchema')
    private readonly account: Model<AccountDocument>,

    @InjectModel('CreditLimitReserveSchema')
    private readonly mongooseModel: Model<CreditLimitReserveDocument>,
  ) {
    super();

    this.sellerId = parseInt(process.env.LEGACY_LOCATION_ID);
    this.storeId = parseInt(process.env.LEGACY_STORE_ID);
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<CreditLimitReserveEntity[]> {
    console.log('Buscando registros...');

    return await this.typeormRepository.find({ where: { status: 0 } });
  }

  protected async store(entities: CreditLimitReserveEntity[]): Promise<void> {
    const seller = await this.getSeller();
    const store = await this.getStore();

    let cont = 1;

    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.mongooseModel.create({
        cnpj: entity.cnpj,
        usedCreditLimit: entity.usedCreditLimit,
        storeOrderId: entity.orderId,
        reservedAt: entity.reservedAt,
        accountStoreId: store._id,
        accountLocationId: seller._id,
        status: entity.status,
      });

      cont = cont + 1;
    }
  }

  private async getSeller(): Promise<Account> {
    return await this.account
      .findOne({
        legacyCodigoDistribuidor: this.sellerId,
      })
      .exec();
  }

  private async getStore(): Promise<Account> {
    return await this.account
      .findOne({
        legacySiteId: this.storeId,
      })
      .exec();
  }
}
