import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity('Site_Credencial')
export class StoreCredentialEntity {
  @PrimaryColumn({ name: 'SiteId' })
  storeId: number;

  @Column({ name: 'UsuarioOauth' })
  oAuthUsername: string;

  @Column({ name: 'SenhaOauth' })
  oAuthPassword: string;

  @OneToOne(() => StoreEntity, storeEntity => storeEntity.credential)
  store: StoreEntity;
}
