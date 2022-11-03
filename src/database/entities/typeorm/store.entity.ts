import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { SellerEntity } from './seller.entity';
import { StoreCredentialEntity } from './store-credential.entity';

@Entity('Site')
export class StoreEntity {
  @PrimaryColumn({ name: 'SiteId' })
  id: number;

  @Column({ name: 'Nome' })
  name: string;

  @Column({ name: 'Status' })
  status: boolean;

  @Column({ name: 'StoreFrontSigla' })
  code: string;

  @Column({ name: 'Token' })
  token: string;

  @Column({ name: 'DominioHub' })
  hubUrl: string;

  @Column({ name: 'DataCriacao' })
  createdAt: Date;

  @Column({ name: 'DataAlteracao' })
  updatedAt: Date;

  @ManyToMany(() => SellerEntity, seller => seller.stores)
  sellers: SellerEntity[];

  @OneToOne(() => StoreCredentialEntity, credential => credential.store)
  @JoinColumn({
    name: 'SiteId',
    referencedColumnName: 'storeId',
  })
  credential: StoreCredentialEntity;
}
