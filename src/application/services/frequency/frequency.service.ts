import { Inject, Injectable } from '@nestjs/common';
import { DatasetFactoryFunc } from '@domain/providers/dataset.provider';

@Injectable()
export class FrequencyService {
  constructor(@Inject('DATASET') private readonly _factory: DatasetFactoryFunc) {}

  calcFrequency(dataset: string[]) {
    const datasetResult = this._factory(dataset)
      .getDatasetResult()
      .map<[string, number]>(({ employeePairs: [employeeA, employeeB], timeCoincidences }) => [
        `${employeeA.employeeName}-${employeeB.employeeName}`,
        timeCoincidences
      ]);

    return datasetResult;
  }
}
