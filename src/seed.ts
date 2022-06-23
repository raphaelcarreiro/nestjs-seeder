import { Inject, Injectable } from '@nestjs/common';
import { LocationStockSeeder } from './seeders/location-stock.seeder';
import { OrderSeeder } from './seeders/order.seeder';
import { StockReserveSeeder } from './seeders/stock-reserve.seeder';

@Injectable()
export class Seed {
  constructor(
    @Inject(StockReserveSeeder)
    private readonly stockReserveSeeder: StockReserveSeeder,

    @Inject(LocationStockSeeder)
    private readonly locationStockSeeder: StockReserveSeeder,

    @Inject(OrderSeeder)
    private readonly orderSeeder: StockReserveSeeder,
  ) {}

  async handle() {
    await this.stockReserveSeeder.execute();
    await this.locationStockSeeder.execute();
    await this.orderSeeder.execute();
  }
}
