import { Inject, Injectable } from '@nestjs/common';
import { LocationStockSeeder } from './seeders/location-stock.seeder';
import { OrderSeeder } from './seeders/order.seeder';
import { PriceProductSeeder } from './seeders/price-product.seeder';
import { PriceSeeder } from './seeders/price.seeder';
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

    @Inject(PriceSeeder)
    private readonly priceSeeder: PriceSeeder,

    @Inject(PriceProductSeeder)
    private readonly priceProductSeeder: PriceProductSeeder,
  ) {}

  async handle() {
    // await this.stockReserveSeeder.execute();
    // await this.locationStockSeeder.execute();
    // await this.orderSeeder.execute();
    await this.priceSeeder.execute();
    await this.priceProductSeeder.execute();
  }
}
