import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiEntity } from './api.entity';

@Entity('ApiUsuario')
export class UserApiEntity {
  @PrimaryColumn({ name: 'ApiUsuarioId' })
  id: number;

  @Column({ name: 'Usuario' })
  username: string;

  @Column({ name: 'Senha' })
  password: string;

  @Column({ name: 'Status' })
  status: boolean;

  @Column({ name: 'SiteId' })
  sellerId: number;

  @ManyToMany(() => ApiEntity, api => api.userApi, { eager: true })
  @JoinTable({
    name: 'APIS_APIUsuario',
    joinColumn: {
      name: 'ApiId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'Usuario',
      referencedColumnName: 'id',
    },
  })
  roles: ApiEntity[];
}
