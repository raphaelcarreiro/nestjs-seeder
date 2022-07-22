import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('Produto')
export class OrderProduct {
  @PrimaryColumn({ name: 'PedidoId' })
  orderId: string;

  @PrimaryColumn({ name: 'Sequencial' })
  sequential: number;

  @Column({ name: 'Codigo' })
  sku: string;

  @Column({ name: 'KitSkuName' })
  kitSkuName: string | null;

  @Column({ name: 'KitQuantity' })
  kitQuantity: number | null;

  @Column({ name: 'ValorUnitario' })
  price: number;

  @Column({ name: 'Quantidade' })
  amount: number;

  @Column({ name: 'MetaSkuId' })
  metaSkuId: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  @JoinColumn({
    name: 'PedidoId',
    referencedColumnName: 'id',
  })
  order: OrderEntity;
}
