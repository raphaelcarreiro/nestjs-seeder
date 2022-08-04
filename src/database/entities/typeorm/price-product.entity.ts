import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Produto_Site_TabelaPreco' })
export class PriceProductEntity {
  @PrimaryColumn({ name: 'TabelaPrecoId' })
  priceId: number;

  @PrimaryColumn({ name: 'SiteId' })
  locationId: number;

  @PrimaryColumn({ name: 'Sku' })
  sku: string;

  @Column({ name: 'Preco' })
  price: number;
}
