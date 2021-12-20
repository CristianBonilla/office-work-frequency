import { Test, TestingModule } from '@nestjs/testing';
import { ReadDatasetService } from './read-dataset.service';

describe('ReadFileService', () => {
  let service: ReadDatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadDatasetService]
    }).compile();

    service = module.get<ReadDatasetService>(ReadDatasetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
