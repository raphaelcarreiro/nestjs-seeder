import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { StockReserveEntity } from 'src/database/entities/typeorm/stock-reserve.entity';
import { StockReserveDocument } from 'src/database/schemas/mongoose/stock-reserve.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class StockReserveSeeder extends SeederAbstract<StockReserveEntity> {
  constructor(
    @InjectRepository(StockReserveEntity)
    private readonly typeormRepository: Repository<StockReserveEntity>,

    @InjectModel('StockReserveSchema')
    private readonly mongooseModel: Model<StockReserveDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<StockReserveEntity[]> {
    console.log('Buscando registros...');

    return await this.typeormRepository.find();
  }

  protected async store(entities: StockReserveEntity[]): Promise<void> {
    let cont = 1;

    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.mongooseModel.create({
        sku: entity.productId,
        quantity: entity.amount,
        orderId: entity.orderId,
        reservedAt: entity.reservedAt,
        legacyLocationId: entity.locationId,
        legacyStoreId: entity.storeId,
        status: entity.status,
        kitId: entity.kitId,
      });

      cont = cont + 1;
    }
  }
}
