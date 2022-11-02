import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PaymentMethodDocument = PaymentMethod & Document;

@Schema({ collection: 'paymentMethods' })
export class PaymentMethod {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isMain: boolean;
}

const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

export { PaymentMethodSchema };
