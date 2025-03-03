import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TenantStatus } from 'src/enums/tenant-status.enum';

export class CreateTenantRequestDto {
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

  @ApiProperty({
    example: 'userpool_id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  cognitoUserPoolId: string;
}
