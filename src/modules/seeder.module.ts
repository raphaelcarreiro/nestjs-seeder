import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationStockEntity } from 'src/database/entities/typeorm/location-stock.entity';
import { OrderPayment } from 'src/database/entities/typeorm/order-payment.entity';
import { OrderProduct } from 'src/database/entities/typeorm/order-product.entity';
import { OrderStatus } from 'src/database/entities/typeorm/order-status.entity';
import { OrderEntity } from 'src/database/entities/typeorm/order.entity';
import { PriceEntity } from 'src/database/entities/typeorm/price.entity';
import { PriceProductEntity } from 'src/database/entities/typeorm/price-product.entity';
import { StockReserveEntity } from 'src/database/entities/typeorm/stock-reserve.entity';
import { LocationStockSchema } from 'src/database/schemas/mongoose/location-stock.schema';
import { OrderSchema } from 'src/database/schemas/mongoose/order.schema';
import { StockReserveSchema } from 'src/database/schemas/mongoose/stock-reserve.schema';
import { LocationStockSeeder } from 'src/seeders/location-stock.seeder';
import { OrderSeeder } from 'src/seeders/order.seeder';
import { StockReserveSeeder } from 'src/seeders/stock-reserve.seeder';
import { PriceSchema } from 'src/database/schemas/mongoose/price.schema';
import { PriceProductSchema } from 'src/database/schemas/mongoose/price-product.schema';
import { PriceSeeder } from 'src/seeders/price.seeder';
import { PriceProductSeeder } from 'src/seeders/price-product.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocationStockEntity,
      StockReserveEntity,
      OrderEntity,
      OrderPayment,
      OrderProduct,
      OrderStatus,
      PriceEntity,
      PriceProductEntity,
    ]),
    MongooseModule.forFeature([
      { name: 'LocationStockSchema', schema: LocationStockSchema },
      { name: 'StockReserveSchema', schema: StockReserveSchema },
      { name: 'OrderSchema', schema: OrderSchema },
      { name: 'PriceSchema', schema: PriceSchema },
      { name: 'PriceProductSchema', schema: PriceProductSchema },
    ]),
  ],
  providers: [
    StockReserveSeeder,
    OrderSeeder,
    LocationStockSeeder,
    PriceSeeder,
    PriceProductSeeder,
  ],
  exports: [
    StockReserveSeeder,
    OrderSeeder,
    LocationStockSeeder,
    PriceSeeder,
    PriceProductSeeder,
  ],
})
export class SeederModule {}
