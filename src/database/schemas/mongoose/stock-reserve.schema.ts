import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.schema';
import { StockReserveStatus } from './StockReserveStatus';

export type StockReserveDocument = StockReserve & Document;

@Schema({ collection: 'stockReserves' })
export class StockReserve {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Account.name })
  accountLocationId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Account.name })
  accountStoreId: string;

  @Prop({ required: true })
  status: StockReserveStatus;

  @Prop({ default: null })
  kitId: string | null;

  @Prop({ required: true })
  reservedAt: Date;
}

const StockReserveSchema = SchemaFactory.createForClass(StockReserve);

export { StockReserveSchema };
