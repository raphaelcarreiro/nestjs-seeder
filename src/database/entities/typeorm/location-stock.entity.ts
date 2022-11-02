import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Estoque_Distribuidor' })
export class LocationStockEntity {
  @PrimaryColumn({
    name: 'Sku',
  })
  sku: string;

  @PrimaryColumn({ name: 'SiteId' })
  siteId: number;

  @Column({ name: 'Total' })
  total: number;

  @Column({ name: 'Reservado' })
  reservado: number;

  @Column({ name: 'Disponivel' })
  disponivel: number;

  @Column({ name: 'PreVenda' })
  preVenda: number;

  @Column({ name: 'Virtual' })
  virtual: number;

  @Column({ name: 'DataUltimaImportacao' })
  dataUltimaImportacao: Date;

  @Column({ name: 'PrazoDisponibilidade' })
  prazoDisponibilidade: number;

  @Column({ name: 'Tipo' })
  tipo: number;

  @Column({ name: 'Fisico' })
  fisico: number;

  @Column({ name: 'Jit' })
  jit: number;

  @Column({ name: 'DataIntegracao' })
  dataIntegracao: Date;
}
