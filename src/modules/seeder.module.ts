import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationStockEntity } from 'src/database/entities/typeorm/location-stock.entity';
import { OrderPayment } from 'src/database/entities/typeorm/order-payment.entity';
import { OrderProduct } from 'src/database/entities/typeorm/order-product.entity';
import { OrderStatus } from 'src/database/entities/typeorm/order-status.entity';
import { OrderEntity } from 'src/database/entities/typeorm/order.entity';
import { StockReserveEntity } from 'src/database/entities/typeorm/stock-reserve.entity';
import { LocationStockSchema } from 'src/database/schemas/mongoose/location-stock.schema';
import { OrderSchema } from 'src/database/schemas/mongoose/order.schema';
import { StockReserveSchema } from 'src/database/schemas/mongoose/stock-reserve.schema';
import { LocationStockSeeder } from 'src/seeders/location-stock.seeder';
import { OrderSeeder } from 'src/seeders/order.seeder';
import { StockReserveSeeder } from 'src/seeders/stock-reserve.seeder';
import { PaymentMethodSchema } from 'src/database/schemas/mongoose/payment-method.schema';
import { PricePerMethodSchema } from 'src/database/schemas/mongoose/price-per-method.schema';
import { CreditLimitSchema } from 'src/database/schemas/mongoose/credit-limit.schemas';
import { CreditLimitReserveSchema } from 'src/database/schemas/mongoose/credit-limit-reserve.schema';
import { PaymentMethodSeeder } from 'src/seeders/payment-method.seeder';
import { PricePerMethodSeeder } from 'src/seeders/price-per-method.seeder';
import { CreditLimitSeeder } from 'src/seeders/credit-limit.seeder';
import { CreditLimitReserveSeeder } from 'src/seeders/credit-limit-reserve.seeder';
import { PaymentMethodEntity } from 'src/database/entities/typeorm/payment-method.entity';
import { PricePerMethodEntity } from 'src/database/entities/typeorm/price-per-method.entity';
import { AccountSchema } from 'src/database/schemas/mongoose/account.schema';
import { CreditLimitEntity } from 'src/database/entities/typeorm/credit-limit.entity';
import { CreditLimitReserveEntity } from 'src/database/entities/typeorm/credit-limit-reserve.entity';
import { StoreEntity } from 'src/database/entities/typeorm/store.entity';
import { SellerEntity } from 'src/database/entities/typeorm/seller.entity';
import { StoreCredentialEntity } from 'src/database/entities/typeorm/store-credential.entity';
import { AccountSellerSeeder } from 'src/seeders/account-seller.seeder';
import { AccountStoreSeeder } from 'src/seeders/account-store.seeder';
import { SellerStoreEntity } from 'src/database/entities/typeorm/seller-store.entity';
import { ApiEntity } from 'src/database/entities/typeorm/api.entity';
import { UserApiEntity } from 'src/database/entities/typeorm/user-api.entity';
import { AuthSchema } from 'src/database/schemas/mongoose/auth.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocationStockEntity,
      StockReserveEntity,
      OrderEntity,
      OrderPayment,
      OrderProduct,
      OrderStatus,
      PaymentMethodEntity,
      PricePerMethodEntity,
      CreditLimitEntity,
      CreditLimitReserveEntity,
      StoreEntity,
      SellerEntity,
      StoreCredentialEntity,
      SellerStoreEntity,
      ApiEntity,
      UserApiEntity,
    ]),
    MongooseModule.forFeature([
      { name: 'LocationStockSchema', schema: LocationStockSchema },
      { name: 'StockReserveSchema', schema: StockReserveSchema },
      { name: 'OrderSchema', schema: OrderSchema },
      { name: 'PaymentMethodSchema', schema: PaymentMethodSchema },
      { name: 'PricePerMethodSchema', schema: PricePerMethodSchema },
      { name: 'CreditLimitSchema', schema: CreditLimitSchema },
      { name: 'CreditLimitReserveSchema', schema: CreditLimitReserveSchema },
      { name: 'AccountSchema', schema: AccountSchema },
      { name: 'AuthSchema', schema: AuthSchema },
    ]),
  ],
  providers: [
    StockReserveSeeder,
    OrderSeeder,
    LocationStockSeeder,
    PaymentMethodSeeder,
    PricePerMethodSeeder,
    CreditLimitSeeder,
    CreditLimitReserveSeeder,
    AccountSellerSeeder,
    AccountStoreSeeder,
  ],
  exports: [
    StockReserveSeeder,
    OrderSeeder,
    LocationStockSeeder,
    PaymentMethodSeeder,
    PricePerMethodSeeder,
    CreditLimitSeeder,
    CreditLimitReserveSeeder,
    AccountSellerSeeder,
    AccountStoreSeeder,
  ],
})
export class SeederModule {}
