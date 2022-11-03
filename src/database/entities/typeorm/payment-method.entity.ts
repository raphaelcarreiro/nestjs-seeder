import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PricePerMethodEntity } from './price-per-method.entity';

@Entity({ name: 'TabelaPreco' })
export class PaymentMethodEntity {
  @PrimaryGeneratedColumn({ name: 'TabelaPrecoId' })
  id: number;

  @Column({ name: 'Codigo' })
  code: string;

  @Column({ name: 'Nome' })
  name: string;

  @Column({ name: 'Principal' })
  isMain: boolean;

  @OneToMany(() => PricePerMethodEntity, pricePerMethod => pricePerMethod.paymentMethod)
  pricePerMethods: PricePerMethodEntity[];
}
