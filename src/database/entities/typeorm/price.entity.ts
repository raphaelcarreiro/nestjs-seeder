import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TabelaPreco')
export class PriceEntity {
  @PrimaryGeneratedColumn({ name: 'TabelaPrecoId' })
  id: string;

  @Column({ name: 'Codigo' })
  code: string;

  @Column({ name: 'Nome' })
  name: string;

  @Column({ name: 'Principal' })
  isMain: boolean;
}
