import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuidV4 } from 'uuid';
import { UserTenantRoleMapping } from './user_tenant_role_mapping.entity';

@Entity('user_roles')
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => UserTenantRoleMapping, (mapping) => mapping.role)
  userTenantRoleMappings: UserTenantRoleMapping[];

  beforeInsert() {
    this.id = uuidV4();
  }
}
