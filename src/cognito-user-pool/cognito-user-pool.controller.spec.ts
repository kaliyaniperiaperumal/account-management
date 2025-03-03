import { Test, TestingModule } from '@nestjs/testing';
import { CognitoUserPoolController } from './cognito-user-pool.controller';
import { CognitoUserPoolService } from './cognito-user-pool.service';

describe('CognitoUserPoolController', () => {
  let controller: CognitoUserPoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CognitoUserPoolController],
      providers: [CognitoUserPoolService],
    }).compile();

    controller = module.get<CognitoUserPoolController>(CognitoUserPoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
