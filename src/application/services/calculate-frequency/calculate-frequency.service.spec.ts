import { Test, TestingModule } from '@nestjs/testing';
import { CalculateFrequencyService } from './calculate-frequency.service';

describe('CalculateFrequencyService', () => {
  let service: CalculateFrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateFrequencyService],
    }).compile();

    service = module.get<CalculateFrequencyService>(CalculateFrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
