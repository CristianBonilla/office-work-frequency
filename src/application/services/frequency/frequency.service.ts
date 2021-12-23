import { Inject, Injectable } from '@nestjs/common';
import { DatasetFactoryFunc } from '@domain/providers/dataset.provider';
import { TableFunc } from '@providers/table.provider';

@Injectable()
export class FrequencyService {
  constructor(@Inject('TABLE') private readonly _table: TableFunc, @Inject('DATASET') private readonly _factory: DatasetFactoryFunc) {}

  calcFrequency(dataset: string[]) {
    const datasetResult = this._factory(dataset)
      .getDatasetResult()
      .map<[string, number]>(({ employeePairs: [employeeA, employeeB], timeCoincidences }) => [
        `${employeeA.employeeName}-${employeeB.employeeName}`,
        timeCoincidences
      ]);
    const table = this._table();
    table.push(...datasetResult);

    return table;
  }
}
