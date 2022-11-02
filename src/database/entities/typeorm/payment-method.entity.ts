import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
