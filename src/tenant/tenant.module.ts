import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from 'src/entities/tenant.entity';
import { CognitoUserPoolModule } from 'src/cognito-user-pool/cognito-user-pool.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    AuthModule,
    CognitoUserPoolModule,
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
