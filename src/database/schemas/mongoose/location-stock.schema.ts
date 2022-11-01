import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.schema';

export type LocationStockDocument = LocationStock & mongoose.Document;

@Schema({ collection: 'locationStocks' })
export class LocationStock {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Account.name })
  accountLocationId: string;

  @Prop({ required: true })
  total: number;

  @Prop()
  virtual: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const LocationStockSchema = SchemaFactory.createForClass(LocationStock);

export { LocationStockSchema };
