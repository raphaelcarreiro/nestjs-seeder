import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationStockEntity } from 'src/database/entities/typeorm/location-stock.entity';
import { OrderEntity } from 'src/database/entities/typeorm/order.entity';
import { StockReserveEntity } from 'src/database/entities/typeorm/stock-reserve.entity';
import { LocationStockSchema } from 'src/database/schemas/mongoose/location-stock.schema';
import { OrderSchema } from 'src/database/schemas/mongoose/order.schema';
import { StockReserveSchema } from 'src/database/schemas/mongoose/stock-reserve.schema';
import { LocationStockSeeder } from 'src/seeders/location-stock.seeder';
import { OrderSeeder } from 'src/seeders/order.seeder';
import { StockReserveSeeder } from 'src/seeders/stock-reserve.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocationStockEntity,
      StockReserveEntity,
      OrderEntity,
    ]),
    MongooseModule.forFeature([
      { name: 'LocationStockSchema', schema: LocationStockSchema },
      { name: 'StockReserveSchema', schema: StockReserveSchema },
      { name: 'OrderSchema', schema: OrderSchema },
    ]),
  ],
  providers: [StockReserveSeeder, OrderSeeder, LocationStockSeeder],
  exports: [StockReserveSeeder, OrderSeeder, LocationStockSeeder],
})
export class SeederModule {}
