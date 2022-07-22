import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderPayment } from './order-payment.entity';
import { OrderProduct } from './order-product.entity';
import { OrderStatus } from './order-status.entity';

@Entity('Pedido')
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'PedidoId' })
  id: string;

  @Column({ name: 'DataPedido' })
  createdAt: Date;

  @Column({ name: 'ValorTotal', type: 'decimal', precision: 4 })
  total: number;

  @Column({ name: 'SiteId' })
  storeId: number;

  @Column({ name: 'DistribuidorCodigo' })
  locationId: number;

  @Column({ name: 'DataEnvioDistribuidor' })
  sentToLocationAt: Date | null;

  @Column({ name: 'StatusEnvioDistribuidor' })
  statusSentToLocation: boolean;

  @OneToMany(() => OrderStatus, (orderStatus) => orderStatus.order, {
    eager: true,
  })
  status: OrderStatus[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  products: OrderProduct[];

  @OneToMany(() => OrderPayment, (payment) => payment.order, {
    eager: true,
  })
  payments: OrderPayment[];
}
