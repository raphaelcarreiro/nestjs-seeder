import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AccountDocument = Account & Document;

@Schema({ collection: 'accounts', timestamps: true })
export class Account {
  _id: Types.ObjectId;

  @Prop()
  legacySiteId: number;

  @Prop()
  legacyDistribuidorID: number;

  @Prop()
  legacyCodigoDistribuidor: number;

  @Prop()
  accountIDs: string[];

  @Prop()
  accountType: string;

  @Prop()
  siteUrl: string;

  @Prop()
  integration: {
    type: string;
    url: string;
    token: string;
    username: string;
    password: string;
  }[];

  @Prop()
  description: string;

  @Prop()
  active: boolean;

  @Prop()
  name: string;

  @Prop()
  fiscalCode: string;

  @Prop()
  code: string;

  @Prop()
  onlyPricePolice: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
