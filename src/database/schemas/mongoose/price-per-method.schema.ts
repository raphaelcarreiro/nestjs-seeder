import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Account } from './account.schema';
import { PaymentMethod } from './payment-method.schema';
import { PricePolicy } from './price-policy.schema';

export type PricePerMethodDocument = PricePerMethod & Document;

@Schema({ collection: 'pricePerMethods', timestamps: true })
export class PricePerMethod {
  @Prop({ type: Types.ObjectId, ref: PaymentMethod.name })
  paymentMethodId: ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: PricePolicy.name, default: null })
  pricePolicyId: ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: Account.name, required: true })
  accountLocationId: ObjectId;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  price: number;
}

const PricePerMethodSchema = SchemaFactory.createForClass(PricePerMethod);

export { PricePerMethodSchema };
