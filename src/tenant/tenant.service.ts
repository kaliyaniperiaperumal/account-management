import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from 'src/entities/tenant.entity';
import { Repository } from 'typeorm';
import { CognitoUserPoolService } from 'src/cognito-user-pool/cognito-user-pool.service';
import { CreateTenantRequestDto } from './dto/create-tenant-request.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private readonly cognitoUserPoolService: CognitoUserPoolService,
  ) {}
  async create(createTenanRequesttDto: CreateTenantRequestDto) {
    const cognitoPool = await this.cognitoUserPoolService.findOne(
      createTenanRequesttDto.cognitoUserPoolId,
    );
    if (cognitoPool) {
      const tenantInfo = new CreateTenantDto();
      tenantInfo.name = createTenanRequesttDto.name;
      tenantInfo.address = createTenanRequesttDto.address;
      tenantInfo.status = createTenanRequesttDto.status;
      tenantInfo.cognitoUserPool = cognitoPool;
      return this.tenantRepository.save(tenantInfo);
    }
  }

  findAll() {
    return this.tenantRepository.find();
  }

  findOne(id: string) {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenantInfo = new CreateTenantDto();
    const tenant = this.tenantRepository.findOneBy({ id });
    if (tenant) {
      if (updateTenantDto.cognitoUserPoolId) {
        const cognitoPool = await this.cognitoUserPoolService.findOne(
          updateTenantDto.cognitoUserPoolId,
        );
        if (cognitoPool) {
          tenantInfo.cognitoUserPool = cognitoPool;
        } else {
          throw new BadRequestException(
            'Please provide valid cognito information',
          );
        }
      }
      if (updateTenantDto.name !== null) {
        tenantInfo.name = updateTenantDto.name;
      }
      if (updateTenantDto.address !== null) {
        tenantInfo.address = updateTenantDto.address;
      }
      if (updateTenantDto.status !== null) {
        tenantInfo.status = updateTenantDto.status;
      }
      return this.tenantRepository.update(id, tenantInfo);
    } else {
      throw new BadRequestException('Please provide valid tenant information');
    }
  }

  remove(id: string) {
    return this.tenantRepository.delete({ id });
  }
}
