import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = Order & Document;

type Payment = {
  codePayment: string;
};

type Product = {
  sequential: number;
  sku: string;
  kitSkuName: string | null;
  kitQuantity: number | null;
  value: number;
  quantity: number;
  metaSkuId: number | null;
};

type OrderStatus = {
  paymentCode: number;
  receiptNumber: string;
  detail: string;
  cancellationReason: string;
  createdAt: Date;
};

@Schema({ collection: 'orders' })
export class Order {
  @Prop()
  storeOrderId: string;

  @Prop()
  value: number;

  @Prop()
  legacyStoreId: number;

  @Prop()
  legacyLocationId: number;

  @Prop({ default: null })
  locationNotifiedAt: Date | null;

  @Prop()
  payments: Payment[];

  @Prop()
  products: Product[];

  @Prop()
  orderStatus: OrderStatus[];

  @Prop()
  createdAt: Date;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
