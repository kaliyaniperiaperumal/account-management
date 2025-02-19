import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tenant } from './tenant.entity';
import { User } from './user.entity';
import { UserRole } from './user_roles.entity';
import { UserSession } from './user_sessions.entity';

@Entity('user_tenant_role_mapping')
@Unique(['user', 'tenant', 'role'])
export class UserTenantRoleMapping extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.userTenantRoleMappings, {
    eager: true,
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => User, (user) => user.userTenantRoleMappings, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserRole, (role) => role.userTenantRoleMappings, {
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role: UserRole;

  @OneToMany(() => UserSession, (session) => session.userTenantRoleMapping)
  userSession: UserSession[];
}
