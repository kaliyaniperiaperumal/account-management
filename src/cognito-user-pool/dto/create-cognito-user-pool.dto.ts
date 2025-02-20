import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserPoolType } from 'src/enums/user-pool-type.enum';

export class CreateCognitoUserPoolDto {
  @ApiProperty({
    example: '7e876gtp697v2oaon04vvemt23',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  appClientId: string;

  @ApiProperty({
    example: 'ap-south-1_sagqD3qUG',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userPoolId: string;

  @ApiProperty({
    example: 'ap-south-1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    example: UserPoolType.SHARED,
    required: true,
  })
  @IsEnum(UserPoolType)
  userPoolType: UserPoolType;
}
