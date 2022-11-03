import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PaymentMethodEntity } from './payment-method.entity';

@Entity({ name: 'Produto_Site_TabelaPreco' })
export class PricePerMethodEntity {
  @PrimaryColumn({ name: 'TabelaPrecoId' })
  priceId: number;

  @PrimaryColumn({ name: 'SiteId' })
  locationId: number;

  @PrimaryColumn({ name: 'Sku' })
  sku: string;

  @Column({ name: 'Preco' })
  price: number;

  @ManyToOne(() => PaymentMethodEntity, paymentMethod => paymentMethod.pricePerMethods)
  paymentMethod: PaymentMethodEntity;
}
