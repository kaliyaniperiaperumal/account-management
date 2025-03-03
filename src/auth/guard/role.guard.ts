import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    //private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    console.log('Roles required:', requiredRoles);
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This comes from the JwtAuthGuard
    if (!user) {
      return false; // No user found, deny access
    }
    // const token = request.headers['Authorization']?.split(' ')[1];
    // console.log('Role Token', token);
    // if (!token) {
    //   return false;
    // }
    // const decoded = this.jwtService.decode(token);
    // const userRoles = decoded['custom:role'] || [];
    //return requiredRoles.some((role) => userRoles.includes(role));
    return requiredRoles.some((role) => user['custom:role'] === role);
  }
}
