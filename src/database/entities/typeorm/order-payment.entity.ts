import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('Pagamento')
export class OrderPayment {
  @PrimaryColumn({ name: 'PedidoId' })
  orderId: string;

  @PrimaryColumn({ name: 'Codigo' })
  paymentType: string;

  @ManyToOne(() => OrderEntity, (order) => order.payments)
  @JoinColumn({
    name: 'PedidoId',
    referencedColumnName: 'id',
  })
  order?: OrderEntity;
}
