import { PartialType } from '@nestjs/mapped-types';
import { CreateCognitoUserPoolDto } from './create-cognito-user-pool.dto';

export class UpdateCognitoUserPoolDto extends PartialType(
  CreateCognitoUserPoolDto,
) {}
