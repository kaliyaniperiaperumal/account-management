import { PartialType } from '@nestjs/swagger';
import { CreateTenantRequestDto } from './create-tenant-request.dto';

export class UpdateTenantDto extends PartialType(CreateTenantRequestDto) {}
