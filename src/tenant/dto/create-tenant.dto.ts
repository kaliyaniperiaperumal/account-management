import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CognitoUserPool } from 'src/entities/cognito-user-pool.entity';
import { TenantStatus } from 'src/enums/tenant-status.enum';

export class CreateTenantDto {
  @ApiProperty({
    example: 'tenant_name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Sunnyvale, NA',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: TenantStatus.ACTIVE,
    required: true,
  })
  @IsEnum(TenantStatus)
  status: TenantStatus;

  @IsNotEmpty()
  cognitoUserPool: CognitoUserPool;
}
