import { Module } from '@nestjs/common';
//import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleGuard } from './guard/role.guard';
import { PassportModule } from '@nestjs/passport';
//import { JwksService } from './jwks.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, JwtAuthGuard, RoleGuard],
  exports: [JwtAuthGuard, RoleGuard],
})
export class AuthModule {}
