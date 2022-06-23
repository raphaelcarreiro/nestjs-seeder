import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
