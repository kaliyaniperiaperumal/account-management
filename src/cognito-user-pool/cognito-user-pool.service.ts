import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCognitoUserPoolDto } from './dto/create-cognito-user-pool.dto';
import { UpdateCognitoUserPoolDto } from './dto/update-cognito-user-pool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CognitoUserPool } from 'src/entities/cognito-user-pool.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CognitoUserPoolService {
  constructor(
    @InjectRepository(CognitoUserPool)
    private cognitoUserPoolRepository: Repository<CognitoUserPool>,
  ) {}
  create(createCognitoUserPoolDto: CreateCognitoUserPoolDto) {
    return this.cognitoUserPoolRepository.save(createCognitoUserPoolDto);
  }

  findAll() {
    return this.cognitoUserPoolRepository.find();
  }

  findOne(id: string) {
    return this.cognitoUserPoolRepository.findOne({ where: { id } });
  }

  update(id: string, updateCognitoUserPoolDto: UpdateCognitoUserPoolDto) {
    const userPool = this.cognitoUserPoolRepository.findOneBy({ id });
    if (userPool) {
      return this.cognitoUserPoolRepository.update(
        id,
        updateCognitoUserPoolDto,
      );
    } else {
      throw new BadRequestException(
        'You donot have permission to edit this task',
      );
    }
  }

  remove(id: string) {
    return this.cognitoUserPoolRepository.delete({ id });
  }
}
