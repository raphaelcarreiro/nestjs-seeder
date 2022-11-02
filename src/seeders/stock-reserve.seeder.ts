import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { StockReserveEntity } from 'src/database/entities/typeorm/stock-reserve.entity';
import {
  Account,
  AccountDocument,
} from 'src/database/schemas/mongoose/account.schema';
import { StockReserveDocument } from 'src/database/schemas/mongoose/stock-reserve.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class StockReserveSeeder extends SeederAbstract<StockReserveEntity> {
  private sellerId: number;
  private storeId: number;

  constructor(
    @InjectRepository(StockReserveEntity)
    private readonly typeormRepository: Repository<StockReserveEntity>,

    @InjectModel('AccountSchema')
    private readonly account: Model<AccountDocument>,

    @InjectModel('StockReserveSchema')
    private readonly mongooseModel: Model<StockReserveDocument>,
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

  protected async find(): Promise<StockReserveEntity[]> {
    console.log('Buscando registros de reserva de estoque...');

    return await this.typeormRepository.find({ where: { status: 0 } });
  }

  protected async store(entities: StockReserveEntity[]): Promise<void> {
    const seller = await this.getSeller();
    const store = await this.getStore();

    let cont = 1;
    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.mongooseModel.create({
        sku: entity.productId,
        quantity: entity.amount,
        orderId: entity.orderId,
        accountLocationId: seller._id,
        accountStoreId: store._id,
        status: entity.status,
        kitId: entity.kitId,
        reservedAt: entity.reservedAt,
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
