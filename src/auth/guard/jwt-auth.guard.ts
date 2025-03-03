import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private context: ExecutionContext) {
    super();
  }
  handleRequest(err, user, info) {
    console.log('JwtAuthGuard - handleRequest:', err, user, info);
    return super.handleRequest(err, user, info, this.context);
  }
}
