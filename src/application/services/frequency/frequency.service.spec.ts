import Table = require('cli-table');
import { Test, TestingModule } from '@nestjs/testing';
import { DatasetFactoryFunc } from '@domain/providers/dataset.provider';
import { FrequencyService } from '@application/services/frequency/frequency.service';
import { DatasetOperationsFacade } from '@domain/dataset/dataset-operations.facade';
import { DATASET, DATASET_RESULT } from '@test/dataset';

describe('FrequencyService', () => {
  let service: FrequencyService;

  const mockDatasetFactory = jest.fn() as jest.MockedFunction<DatasetFactoryFunc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FrequencyService,
        { provide: 'TABLE', useValue: () => new Table() },
        {
          provide: 'DATASET',
          useFactory() {
            return mockDatasetFactory;
          },
          inject: []
        }
      ]
    }).compile();

    service = module.get(FrequencyService);
  });

  afterEach(() => {
    mockDatasetFactory.mockClear();
  });

  it('should correctly create frequency service', () => {
    // assert
    expect(service).toBeDefined();
  });

  it('should correctly calculate the frequency of dataset', () => {
    // arrange
    const facade = new DatasetOperationsFacade(DATASET);
    facade.getDatasetResult = jest.fn().mockReturnValue(DATASET_RESULT);
    mockDatasetFactory.mockReturnValue(facade);
    const datasetResultSpy = jest.spyOn(facade, 'getDatasetResult');
    const pushSpy = jest.spyOn(Table.prototype, 'push');

    // act
    const datasetResult = service.calcFrequency(DATASET);

    // assert
    expect(datasetResultSpy).toBeCalled();
    expect(datasetResult).toBeDefined();
    expect(pushSpy).toBeCalledWith(...datasetResult);
  });
});
