import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({
    example: '7e876gtp697v2oaon04vvemt23',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ap-south-1_sagqD3qUG',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
