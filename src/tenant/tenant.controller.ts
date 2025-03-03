import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { CreateTenantRequestDto } from './dto/create-tenant-request.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Post()
  create(@Body() createTenantRequestDto: CreateTenantRequestDto) {
    return this.tenantService.create(createTenantRequestDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
