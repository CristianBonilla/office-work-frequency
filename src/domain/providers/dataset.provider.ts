import { FactoryProvider } from '@nestjs/common';
import { DatasetOperationsFacade } from '@domain/dataset/dataset-operations.facade';

export type DatasetFactoryFunc = (dataset: string[]) => DatasetOperationsFacade;

export const DATASET_OPERATIONS_PROVIDER: FactoryProvider<DatasetFactoryFunc> = {
  provide: 'DATASET',
  useFactory() {
    return (dataset: string[]) => new DatasetOperationsFacade(dataset);
  },
  inject: []
};
