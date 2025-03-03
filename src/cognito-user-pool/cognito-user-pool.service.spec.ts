import { Test, TestingModule } from '@nestjs/testing';
import { CognitoUserPoolService } from './cognito-user-pool.service';

describe('CognitoUserPoolService', () => {
  let service: CognitoUserPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CognitoUserPoolService],
    }).compile();

    service = module.get<CognitoUserPoolService>(CognitoUserPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
