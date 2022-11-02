import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.schema';

export type CreditLimitDocument = CreditLimit & Document;

@Schema({ timestamps: true, collection: 'creditLimits' })
export class CreditLimit {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Account.name,
    required: true,
  })
  accountLocationId: string;

  @Prop()
  cnpj: string;

  @Prop()
  value: number;

  @Prop({ default: 0 })
  usedValue?: number;

  @Prop()
  availableValue?: number;

  @Prop()
  integrationAt?: Date;

  @Prop()
  origin?: string;
}

export const CreditLimitSchema = SchemaFactory.createForClass(CreditLimit);
