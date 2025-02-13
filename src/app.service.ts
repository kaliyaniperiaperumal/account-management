import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //return 'Hello World!';
    throw new HttpException(
      'This is a custom error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
