import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PriceDocument = Price & Document;

@Schema({ collection: 'prices' })
export class Price {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  isMain: boolean;
}

const PriceSchema = SchemaFactory.createForClass(Price);

export { PriceSchema };
