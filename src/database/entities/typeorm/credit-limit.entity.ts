import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'LimiteCredito' })
export class CreditLimitEntity {
  @PrimaryColumn({ name: 'SiteId' })
  legacyLocationId: number;

  @PrimaryColumn({ name: 'CNPJ' })
  documentNumber: string;

  @Column({ name: 'DataInsercao' })
  createdAt: Date;

  @Column({ name: 'DataAtualizacao' })
  updatedAt: Date;

  @Column({ name: 'ValorTotal' })
  value: number;

  @Column({ name: 'ValorUtilizado' })
  usedValue: number;

  @Column({ name: 'ValorDisponivel' })
  availableValue: number;
}
