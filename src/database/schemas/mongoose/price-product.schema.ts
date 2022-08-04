import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Price } from './price.schema';

export type PriceProductDocument = PriceProduct & Document;

@Schema({ collection: 'priceProducts', timestamps: true })
export class PriceProduct {
  @Prop({ type: Types.ObjectId, ref: Price.name })
  priceId: ObjectId | null;

  @Prop({ type: Types.ObjectId })
  policiePriceId: ObjectId | null;

  @Prop()
  legacyLocationId: number;

  @Prop()
  sku: string;

  @Prop()
  price: number;
}

const PriceProductSchema = SchemaFactory.createForClass(PriceProduct);

export { PriceProductSchema };
