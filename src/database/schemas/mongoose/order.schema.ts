import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = Order & Document;

@Schema({ collection: 'orders' })
export class Order {
  @Prop()
  orderId: string;

  @Prop()
  total: string;

  @Prop()
  locationNotifiedAt: Date;

  @Prop()
  isLocationNotified: boolean;

  @Prop()
  storeId: number;

  @Prop()
  locationId: number;

  @Prop()
  createdAt: Date;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
