import { Module } from '@nestjs/common';
import { CognitoUserPoolService } from './cognito-user-pool.service';
import { CognitoUserPoolController } from './cognito-user-pool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitoUserPool } from 'src/entities/cognito-user-pool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CognitoUserPool])],
  controllers: [CognitoUserPoolController],
  providers: [CognitoUserPoolService],
})
export class CognitoUserPoolModule {}
