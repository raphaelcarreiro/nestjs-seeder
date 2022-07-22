import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('Pedido_PedidoStatus')
export class OrderStatus {
  @PrimaryColumn({ name: 'PedidoId' })
  orderId: string;

  @PrimaryColumn({ name: 'PedidoStatusId' })
  orderStatusId: number;

  @PrimaryColumn({
    name: 'NotaFiscal',
  })
  receiptNumber: string | null;

  @Column({ name: 'Data' })
  purchasedAt: Date;

  @Column({ name: 'Observacao' })
  observation: string | null;

  @Column({ name: 'SiglaMotivoCancelamento' })
  cancelmentReason: string | null;

  @Column({ name: 'DataInsercao' })
  createdAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.status)
  @JoinColumn({
    name: 'PedidoId',
    referencedColumnName: 'id',
  })
  order: OrderEntity;
}
