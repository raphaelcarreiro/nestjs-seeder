import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AccountDocument = Account & Document;

@Schema({ collection: 'accounts' })
export class Account {
  _id: string;

  @Prop()
  legacySiteId: number;

  @Prop()
  legacyDistribuidorID: number;

  @Prop()
  legacyCodigoDistribuidor: number;

  @Prop()
  accountIDs: string[];

  @Prop({ required: true })
  accountType: string;

  @Prop({ required: true })
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

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
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
