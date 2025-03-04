import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { UserRole } from 'src/entities/user-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), AuthModule],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
