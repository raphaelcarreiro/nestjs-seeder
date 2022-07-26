import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StockReserveDocument = StockReserve & Document;

@Schema({ collection: 'stockReserves' })
export class StockReserve {
  @Prop()
  sku: string;

  @Prop()
  quantity: number;

  @Prop()
  orderId: string;

  @Prop()
  reservedAt: Date;

  @Prop()
  legacyLocationId: number;

  @Prop()
  legacyStoreId: number;

  @Prop()
  status: number;

  @Prop()
  kitId: string;
}

const StockReserveSchema = SchemaFactory.createForClass(StockReserve);

export { StockReserveSchema };
