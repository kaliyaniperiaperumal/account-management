import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ExternalIdentityProviderType } from 'src/enums/external-idp-type.enum';
import { ExternalIdentityProviderStatus } from 'src/enums/external-idp-status.enum';
import { CognitoUserPool } from './cognito_user_pool.entity';

@Entity('external_identity_providers')
export class ExternalIdentityProvider extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: ExternalIdentityProviderType })
  type: ExternalIdentityProviderType;

  @Column({ name: 'client_id', type: 'varchar' })
  clientId: string;

  @Column({ name: 'client_secret', type: 'varchar' })
  clientSecret: string;

  @Column({ type: 'boolean' })
  enabled: boolean;

  @Column({
    type: 'enum',
    enum: ExternalIdentityProviderStatus,
    default: ExternalIdentityProviderStatus.ACTIVE,
  })
  status: ExternalIdentityProviderStatus;

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
