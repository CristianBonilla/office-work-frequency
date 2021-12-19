import { Test } from '@nestjs/testing';
import { DatasetFactoryFunc, DATASET_OPERATIONS_PROVIDER } from '@domain/providers/dataset.provider';
import { DatasetOperations } from '@domain/dataset/dataset-operations';
import { DatasetOperationsFacade } from '@domain/dataset/dataset-operations.facade';
import { DATASET } from '@test/dataset/dataset';

jest.mock('@domain/dataset/dataset-operations');

describe('DatasetOperationsProvider', () => {
  let factory: DatasetFactoryFunc;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DATASET_OPERATIONS_PROVIDER]
    }).compile();

    factory = module.get<DatasetFactoryFunc>('DATASET');
  });

  it('should correctly create the dataset operations provider', () => {
    // assert
    expect(factory).toBeDefined();
  });

  it('should create the dataset operations facade by invoking the provider', () => {
    // act
    const facade = factory(DATASET);

    // assert
    expect(facade).toBeDefined();
    expect(facade).toBeInstanceOf(DatasetOperationsFacade);
    expect(facade['_datasetOperations']).toBeInstanceOf(DatasetOperations);
  });
});
