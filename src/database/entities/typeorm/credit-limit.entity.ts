import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'LimiteCredito' })
export class CreditLimitEntity {
  @PrimaryColumn('SiteId')
  legacyLocationId: number;

  @PrimaryColumn('CNPJ')
  documentNumber: string;

  @Column('DataInsercao')
  createdAt: Date;

  @Column('DataAtualizacao')
  updatedAt: Date;

  @Column('ValorTotal')
  value: number;

  @Column('ValorUtilizado')
  usedValue: number;

  @Column('ValorDisponivel')
  availableValue: number;

  constructor(payload: CreditLimitEntity) {
    Object.assign(this, payload);
  }
}
