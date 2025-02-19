import { UserStatus } from 'src/enums/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuidV4 } from 'uuid';
import { UserTenantRoleMapping } from './user-tenant-role-mapping.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @OneToMany(() => UserTenantRoleMapping, (mapping) => mapping.user)
  userTenantRoleMappings: UserTenantRoleMapping[];

  beforeInsert() {
    this.id = uuidV4();
  }
}
