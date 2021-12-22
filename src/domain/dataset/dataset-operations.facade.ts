import { DatasetOperations } from '@domain/dataset/dataset-operations';

export class DatasetOperationsFacade {
  private readonly _datasetOperations: DatasetOperations;

  constructor(dataset: string[]) {
    this._datasetOperations = new DatasetOperations(dataset);
  }

  getDatasetResult() {
    return this._datasetOperations.getDatasetResult();
  }
}
