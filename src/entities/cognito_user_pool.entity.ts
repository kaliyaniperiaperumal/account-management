import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserPoolType } from 'src/enums/user-pool-type.enum';
import { Tenant } from './tenant.entity';
import { IdentityProvider } from './identity_provider.entity';

@Entity('cognito_user_pools')
export class CognitoUserPool extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'app_client_id' })
  appClientId: string;

  @Column({ name: 'user_pool_id' })
  userPoolId: string;

  @Column({ name: 'region' })
  region: string;

  @Column({
    name: 'user_pool_type',
    type: 'enum',
    enum: UserPoolType,
    default: UserPoolType.DEDICATED,
  })
  userPoolType: UserPoolType;

  @OneToMany(() => Tenant, (mapping) => mapping.cognitoUserPool)
  tenant: Tenant[];

  @OneToMany(() => IdentityProvider, (mapping) => mapping.cognitoUserPool)
  externalIdentityProvider: IdentityProvider[];
}
