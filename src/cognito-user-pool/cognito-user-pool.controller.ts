import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CognitoUserPoolService } from './cognito-user-pool.service';
import { CreateCognitoUserPoolDto } from './dto/create-cognito-user-pool.dto';
import { UpdateCognitoUserPoolDto } from './dto/update-cognito-user-pool.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Post()
  create(@Body() createCognitoUserPoolDto: CreateCognitoUserPoolDto) {
    return this.cognitoUserPoolService.create(createCognitoUserPoolDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Get()
  findAll(@Request() req) {
    console.log('request user', req.user);
    return this.cognitoUserPoolService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cognitoUserPoolService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCognitoUserPoolDto: UpdateCognitoUserPoolDto,
  ) {
    return this.cognitoUserPoolService.update(id, updateCognitoUserPoolDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('super-admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cognitoUserPoolService.remove(id);
  }
}
