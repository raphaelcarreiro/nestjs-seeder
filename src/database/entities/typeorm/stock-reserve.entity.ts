import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ReservaEstoque')
export class StockReserveEntity {
  @PrimaryColumn({ name: 'CodigoProduto' })
  productId: string;

  @Column({ name: 'Quantidade' })
  amount: number;

  @PrimaryColumn({ name: 'DistribuidorId' })
  locationId: number;

  @PrimaryColumn({ name: 'PedidoId' })
  orderId: string;

  @Column({ name: 'DataReserva' })
  reservedAt: Date;

  @Column({ name: 'LojaId' })
  storeId: number;

  @Column({ name: 'Status' })
  status: number;

  @PrimaryColumn({ name: 'CodigoCombo' })
  kitId: string;
}
