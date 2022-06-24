import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LocationStockDocument = LocationStock & mongoose.Document;

@Schema({ collection: 'location_stocks' })
export class LocationStock {
  @Prop()
  sku: string;

  @Prop()
  legacyLocationId: number;

  @Prop()
  total: number;

  @Prop()
  reserved: number;

  @Prop()
  virtual: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const LocationStockSchema = SchemaFactory.createForClass(LocationStock);

export { LocationStockSchema };
