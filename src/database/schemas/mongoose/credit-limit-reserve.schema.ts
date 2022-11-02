import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CreditLimitReserveDocument = CreditLimitReserve & Document;

@Schema({ collection: 'creditLimitReserves' })
export class CreditLimitReserve {
  @Prop({ required: true })
  cnpj: string;

  @Prop({ required: true })
  usedCreditLimit: number;

  @Prop({ required: true })
  storeOrderId: string;

  @Prop({ required: true })
  reservedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  })
  accountStoreId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  })
  accountLocationId: mongoose.Types.ObjectId;

  @Prop({ required: true, default: 0 })
  status: number;
}

const CreditLimitReserveSchema =
  SchemaFactory.createForClass(CreditLimitReserve);

export { CreditLimitReserveSchema };
