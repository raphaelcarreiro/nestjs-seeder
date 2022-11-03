import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.schema';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  _id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  token: string;

  @Prop({ type: String })
  access_token: string;

  @Prop({
    type: Types.ObjectId,
    ref: Account.name,
    required: true,
  })
  accountId: Types.ObjectId;

  @Prop()
  accessRules: string[];

  @Prop({
    type: Date,
    default: Date.now,
    timestamps: true,
  })
  updatedAt: Date;

  @Prop({
    type: Date,
    default: Date.now() + 3600 * 1000 * 24,
    timestamps: true,
  })
  expires: Date;
}

const AuthSchema = SchemaFactory.createForClass(Auth);

export { AuthSchema };
