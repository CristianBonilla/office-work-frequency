import { WEEK_DAYS_KEYS } from '@contracts/constants/week-days';
import { DataSet, DataSetResult, Time } from '@contracts/DTO/dataset';
import { ExtractDataset } from '@domain/dataset/extract-dataset';
import { TimeLapsesInHours } from '@domain/time-lapses-in-hours';
import { TimeLapsesInMinutes } from '@domain/time-lapses-in-minutes';

export class DatasetOperations {
  private readonly _extractDataset: ExtractDataset;

  constructor(dataset: string[]) {
    this._extractDataset = new ExtractDataset(dataset);
  }

  getDatasetResult() {
    const employeePairs = this.getEmployeePairs();
    const datasetResult: DataSetResult[] = [];
    for (const [employeeA, employeeB] of employeePairs) {
      let timeCoincidences = 0;
      for (const key of WEEK_DAYS_KEYS) {
        const timeA = employeeA.times.find(({ day }) => day === key);
        const timeB = employeeB.times.find(({ day }) => day === key);
        if (!!timeA && !!timeB && this.hasTimeCoincidences(timeA, timeB)) {
          timeCoincidences++;
        }
      }
      datasetResult.push({ employeePairs: [employeeA, employeeB], timeCoincidences });
    }

    return datasetResult;
  }

  private hasTimeCoincidences(timeA: Omit<Time, 'day'>, timeB: Omit<Time, 'day'>) {
    const inHours = new TimeLapsesInHours(timeA, timeB);
    const inMinutes = new TimeLapsesInMinutes(timeA, timeB);

    return inHours.hasCoincidences() || inMinutes.hasCoincidences();
  }

  private getEmployeePairs() {
    const dataset = this._extractDataset.extract();
    const employeeNames = dataset.map(({ employeeName }) => employeeName);
    const pairs = employeeNames
      .map<[string, string][]>((employeeName, index) => employeeNames.slice(index + 1).map(name => [employeeName, name]))
      .flat()
      .map<[DataSet, DataSet]>(([nameA, nameB]) => [dataset.find(({ employeeName }) => employeeName === nameA), dataset.find(({ employeeName }) => employeeName === nameB)]);

    return pairs;
  }
}
