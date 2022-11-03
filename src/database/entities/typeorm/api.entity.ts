import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserApiEntity } from './user-api.entity';

@Entity('Apis')
export class ApiEntity {
  @PrimaryColumn({ name: 'ApiId' })
  id: number;

  @Column({ name: 'Nome' })
  name: string;

  @ManyToMany(() => UserApiEntity, userApi => userApi.roles)
  userApi: UserApiEntity;
}
