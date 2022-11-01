import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Account } from './account.schema';

export type PricePolicyDocument = PricePolicy & Document;

@Schema({ collection: 'pricePolicies', timestamps: true })
export class PricePolicy {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Account.name })
  accountLocationId: string;
}

const PricePolicySchema = SchemaFactory.createForClass(PricePolicy);

export { PricePolicySchema };
