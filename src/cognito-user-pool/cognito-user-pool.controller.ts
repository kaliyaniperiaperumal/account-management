import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CognitoUserPoolService } from './cognito-user-pool.service';
import { CreateCognitoUserPoolDto } from './dto/create-cognito-user-pool.dto';
import { UpdateCognitoUserPoolDto } from './dto/update-cognito-user-pool.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('cognito-user-pool')
export class CognitoUserPoolController {
  constructor(
    private readonly cognitoUserPoolService: CognitoUserPoolService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Cognito user pool information created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request with Mandatory field missing.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateCognitoUserPoolDto,
    description: 'Json structure for user object',
  })
  @Post()
  create(@Body() createCognitoUserPoolDto: CreateCognitoUserPoolDto) {
    return this.cognitoUserPoolService.create(createCognitoUserPoolDto);
  }

  @Get()
  findAll() {
    return this.cognitoUserPoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cognitoUserPoolService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCognitoUserPoolDto: UpdateCognitoUserPoolDto,
  ) {
    return this.cognitoUserPoolService.update(id, updateCognitoUserPoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cognitoUserPoolService.remove(id);
  }
}
