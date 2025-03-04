import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}
  create(createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleRepository.save(createUserRoleDto);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  findOne(id: string) {
    return this.userRoleRepository.findOne({ where: { id } });
  }

  update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const role = this.userRoleRepository.findOneBy({ id });
    if (role) {
      return this.userRoleRepository.update(id, updateUserRoleDto);
    } else {
      throw new BadRequestException('Please privde valid role');
    }
    return `This action updates a #${id} userRole`;
  }

  remove(id: string) {
    return this.userRoleRepository.delete(id);
  }
}
