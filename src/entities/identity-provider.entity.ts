import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { IdentityProviderType } from 'src/enums/identity-provider-type.enum';
import { IdentityProviderStatus } from 'src/enums/identity-provider-status.enum';
import { CognitoUserPool } from './cognito-user-pool.entity';

@Entity('identity_providers')
export class IdentityProvider extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: IdentityProviderType })
  type: IdentityProviderType;

  @Column({ name: 'client_id', type: 'varchar' })
  clientId: string;

  @Column({ name: 'client_secret', type: 'varchar' })
  clientSecret: string;

  @Column({ type: 'boolean' })
  enabled: boolean;

  @Column({
    type: 'enum',
    enum: IdentityProviderStatus,
    default: IdentityProviderStatus.ACTIVE,
  })
  status: IdentityProviderStatus;

  @ManyToOne(
    () => CognitoUserPool,
    (userPool) => userPool.externalIdentityProvider,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'cognito_user_pool_id' })
  cognitoUserPool: CognitoUserPool;
}
