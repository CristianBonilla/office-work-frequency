import { Test, TestingModule } from '@nestjs/testing';
import { TABLE_PROVIDER } from '@providers/table.provider';
import { FrequencyService } from '@application/services/frequency/frequency.service';
import { DATASET_OPERATIONS_PROVIDER } from '@domain/providers/dataset.provider';

describe('FrequencyService', () => {
  let service: FrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrequencyService, TABLE_PROVIDER, DATASET_OPERATIONS_PROVIDER]
    }).compile();

    service = module.get<FrequencyService>(FrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
