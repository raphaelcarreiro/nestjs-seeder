import { Inject, Injectable } from '@nestjs/common';
import { AccountSellerSeeder } from './seeders/account-seller.seeder';
import { AccountStoreSeeder } from './seeders/account-store.seeder';
import { AuthSeeder } from './seeders/auth-seeder';
import { CreditLimitReserveSeeder } from './seeders/credit-limit-reserve.seeder';
import { CreditLimitSeeder } from './seeders/credit-limit.seeder';
import { LocationStockSeeder } from './seeders/location-stock.seeder';
import { PaymentMethodSeeder } from './seeders/payment-method.seeder';
import { PricePerMethodSeeder } from './seeders/price-per-method.seeder';
import { StockReserveSeeder } from './seeders/stock-reserve.seeder';

@Injectable()
export class Seed {
  constructor(
    @Inject(StockReserveSeeder)
    private readonly stockReserveSeeder: StockReserveSeeder,

    @Inject(LocationStockSeeder)
    private readonly locationStockSeeder: LocationStockSeeder,

    @Inject(PaymentMethodSeeder)
    private readonly paymentMethodSeeder: PaymentMethodSeeder,

    @Inject(PricePerMethodSeeder)
    private readonly pricePerMethodSeeder: PricePerMethodSeeder,

    @Inject(CreditLimitSeeder)
    private readonly creditLimitSeeder: CreditLimitSeeder,

    @Inject(CreditLimitReserveSeeder)
    private readonly creditLimitReserveSeeder: CreditLimitReserveSeeder,

    @Inject(AccountStoreSeeder)
    private readonly accountStoreSeeder: AccountStoreSeeder,

    @Inject(AccountSellerSeeder)
    private readonly accountSellerSeeder: AccountSellerSeeder,

    @Inject(AuthSeeder)
    private readonly authSeeder: AuthSeeder,
  ) {}

  async handle() {
    // await this.paymentMethodSeeder.execute();
    // await this.pricePerMethodSeeder.execute();
    // await this.locationStockSeeder.execute();
    // await this.stockReserveSeeder.execute();
    // await this.creditLimitSeeder.execute();
    // await this.creditLimitReserveSeeder.execute();
    await this.accountStoreSeeder.execute();
    await this.accountSellerSeeder.execute();
    await this.authSeeder.execute();
  }
}
