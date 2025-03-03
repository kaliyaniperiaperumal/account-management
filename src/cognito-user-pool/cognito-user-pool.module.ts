import { Module } from '@nestjs/common';
import { CognitoUserPoolService } from './cognito-user-pool.service';
import { CognitoUserPoolController } from './cognito-user-pool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitoUserPool } from 'src/entities/cognito-user-pool.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CognitoUserPool]), AuthModule],
  controllers: [CognitoUserPoolController],
  providers: [CognitoUserPoolService],
  exports: [CognitoUserPoolService],
})
export class CognitoUserPoolModule {}
