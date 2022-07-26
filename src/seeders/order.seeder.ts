import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { OrderEntity } from 'src/database/entities/typeorm/order.entity';
import { Order } from 'src/database/schemas/mongoose/order.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class OrderSeeder extends SeederAbstract<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly typeormRepository: Repository<OrderEntity>,

    @InjectModel('OrderSchema')
    private readonly mongooseModel: Model<Order>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<OrderEntity[]> {
    console.log('Buscando registros...');

    return await this.typeormRepository.find();
  }

  protected async store(entities: OrderEntity[]): Promise<void> {
    let cont = 1;
    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.mongooseModel.create({
        storeOrderId: entity.id,
        value: entity.total,
        locationNotifiedAt: entity.sentToLocationAt,
        legacyStoreId: entity.storeId,
        legacyLocationId: entity.locationId,
        createdAt: entity.createdAt,
        products: entity.products.map((product) => ({
          kitQuantity: product.kitQuantity,
          kitSkuName: product.kitSkuName,
          metaSkuId: product.metaSkuId || null,
          quantity: product.amount,
          sequential: product.sequential,
          sku: product.sku,
          value: +product.price,
        })),
        payments: entity.payments.map((payment) => ({
          paymentCode: payment.paymentType,
        })),
        orderStatus: entity.status.map((status) => ({
          orderStatusId: status.orderStatusId,
          receiptNumber: status.receiptNumber || null,
          detail: status.observation || null,
          cancellationReason: status.cancelmentReason || null,
          createdAt: status.createdAt,
        })),
      });

      cont = cont + 1;
    }
  }
}
