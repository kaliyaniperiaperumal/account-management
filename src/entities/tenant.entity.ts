import { TenantStatus } from 'src/enums/tenant-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { BaseEntity } from './base.entity';
import { UserTenantRoleMapping } from './user_tenant_role_mapping.entity';
import { CognitoUserPool } from './cognito_user_pool.entity';

@Entity('tenants')
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'enum', enum: TenantStatus, default: TenantStatus.ACTIVE })
  status: TenantStatus;

  @OneToMany(() => UserTenantRoleMapping, (mapping) => mapping.tenant)
  userTenantRoleMappings: UserTenantRoleMapping[];

  @ManyToOne(
    () => CognitoUserPool,
    (cognitoUserPools) => cognitoUserPools.tenant,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'cognito_user_pool_id' })
  cognitoUserPool: CognitoUserPool;

  beforeInsert() {
    this.id = uuidV4();
  }
}
