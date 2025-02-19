import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserTenantRoleMapping } from './user_tenant_role_mapping.entity';

@Entity('user_sessions')
export class UserSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'access_token', type: 'varchar' })
  accessToken: string;

  @Column({ name: 'id_token', type: 'varchar' })
  idToken: string;

  @Column({ name: 'refresh_token', type: 'varchar' })
  refreshToken: string;

  @Column({ name: 'id_token_expiry', type: 'varchar' })
  idTokenExpiry: Date;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => UserTenantRoleMapping, (mapping) => mapping.userSession, {
    eager: true,
  })
  @JoinColumn({ name: 'user_tenant_role_id' })
  userTenantRoleMapping: UserTenantRoleMapping;
}
