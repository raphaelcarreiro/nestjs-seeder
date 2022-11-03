import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SellerEntity } from './seller.entity';

@Entity('Site_Distribuidor')
export class SellerStoreEntity {
  @PrimaryColumn({ name: 'SiteId' })
  storeId: number;

  @PrimaryColumn({ name: 'SiteIdDistribuidor' })
  sellerId: number;

  @Column({ name: 'Status' })
  status: boolean;

  @ManyToOne(() => SellerEntity, sellerEntity => sellerEntity.sellerStores)
  @JoinColumn({
    name: 'SiteIdDistribuidor',
    referencedColumnName: 'id',
  })
  seller: SellerEntity;
}
