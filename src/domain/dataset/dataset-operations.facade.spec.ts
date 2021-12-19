import { DatasetOperationsFacade } from '@domain/dataset/dataset-operations.facade';
import { DATASET, DATASET_RESULT } from '@test/dataset/dataset';

describe('DatasetOperationsFacade', () => {
  let datasetOperationsFacade: DatasetOperationsFacade;

  beforeEach(() => {
    datasetOperationsFacade = new DatasetOperationsFacade(DATASET);
  });

  it('should correctly create the class of dataset operations facade', () => {
    // assert
    expect(datasetOperationsFacade).toBeDefined();
  });

  it('should get the result of the dataset from the hidden class', () => {
    // arrange
    const datasetResultSpy = jest.spyOn(datasetOperationsFacade['_datasetOperations'], 'getDatasetResult').mockReturnValue(DATASET_RESULT);

    // act
    const datasetResult = datasetOperationsFacade.getDatasetResult();

    // assert
    expect(datasetResultSpy).toBeCalled();
    expect(datasetResult).toEqual(DATASET_RESULT);
  });
});
