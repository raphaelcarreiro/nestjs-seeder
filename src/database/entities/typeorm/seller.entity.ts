import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { SellerStoreEntity } from './seller-store.entity';
import { StoreEntity } from './store.entity';

@Entity('Distribuidor')
export class SellerEntity {
  @PrimaryColumn({ name: 'DistribuidorId' })
  id: number;

  @Column({ name: 'Distribuidor' })
  name: string;

  @Column({ name: 'UsuarioDistribuidor' })
  username: string;

  @Column({ name: 'SenhaDistribuidor' })
  password: string;

  @Column({ name: 'EndpointPedido' })
  orderEndpoint: string;

  @Column({ name: 'UsuarioEndpointPedido' })
  orderUsername: string;

  @Column({ name: 'SenhaEndpointPedido' })
  orderPassword: string;

  @Column({ name: 'EndpointPagamento' })
  paymentEndpoint: string;

  @Column({ name: 'UsuarioEndpointPagamento' })
  paymentUsername: string;

  @Column({ name: 'SenhaEndpointPagamento' })
  paymentPassword: string;

  @Column({ name: 'EndpointCliente' })
  customerEndpoint: string;

  @Column({ name: 'UsuarioEndpointCliente' })
  customerUsername: string;

  @Column({ name: 'SenhaEndpointCliente' })
  customerPassword: string;

  @Column({ name: 'PagamentoApiKey' })
  paymentApiKey: string;

  @Column({ name: 'NotificaIhub' })
  notifyIhub: boolean;

  @Column({ name: 'SellerCode' })
  code: string;

  @Column({ name: 'Status' })
  status: boolean;

  @Column({ name: 'MensagemPersonalizada' })
  useCustomerMessage: boolean;

  @Column({ name: 'PoliticaPreco' })
  usePolicyPrice: boolean;

  @Column({ name: 'UsuarioOauth' })
  oAuthUsername: string;

  @Column({ name: 'SenhaOauth' })
  oAuthPassword: string;

  @Column({ name: 'MotivoCancelamentoPedido' })
  orderCancellationReason: string;

  @Column({ name: 'UseAlfanumerico' })
  useCustomOrderId: boolean;

  @ManyToMany(() => StoreEntity, store => store.sellers, { eager: true })
  @JoinTable({
    name: 'Site_Distribuidor',
    joinColumn: {
      name: 'SiteIdDistribuidor',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'SiteId',
      referencedColumnName: 'id',
    },
  })
  stores: StoreEntity[];

  @OneToMany(() => SellerStoreEntity, sellerStore => sellerStore.seller, { eager: true })
  sellerStores: SellerStoreEntity[];
}
