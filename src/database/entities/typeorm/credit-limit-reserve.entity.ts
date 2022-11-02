import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ReservaLimiteCredito' })
export class CreditLimitReserveEntity {
  @PrimaryColumn({ name: 'CNPJ' })
  cnpj: string;

  @PrimaryColumn({ name: 'Distribuidor' })
  legacyLocationId: number;

  @Column({ name: 'LimiteUtilizado' })
  usedCreditLimit: number;

  @PrimaryColumn({ name: 'PedidoId' })
  orderId: number;

  @Column({ name: 'DataReserva' })
  reservedAt: Date;

  @Column({ name: 'LojaId' })
  legacyStoreId: number;

  @Column({ name: 'Status' })
  status: number;
}
