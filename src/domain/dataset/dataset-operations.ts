import { WEEK_DAYS_KEYS } from '@contracts/constants/week-days';
import { DataSet, DataSetResult, Times } from '@contracts/DTO/dataset';
import { ExtractDataset } from '@domain/dataset/extract-dataset';
import { TimeLapses } from '@domain/time-lapses';

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

  private hasTimeCoincidences(timeA: Omit<Times, 'day'>, timeB: Omit<Times, 'day'>) {
    const {
      start: [startHourA, startMinuteA],
      end: [endHourA, endMinuteA]
    } = timeA;
    const {
      start: [startHourB, startMinuteB],
      end: [endHourB, endMinuteB]
    } = timeB;
    const inHours = new TimeLapses([startHourA, endHourA], [startHourB, endHourB]);
    const inMinutes = new TimeLapses([startMinuteA, endMinuteA], [startMinuteB, endMinuteB]);

    return inHours.hasCoincidences() && inMinutes.hasCoincidences();
  }

  private getEmployeePairs() {
    const dataset = this._extractDataset.extract();
    const employeeNames = dataset.map(({ employeeName }) => employeeName);
    const pairs = employeeNames
      .map<[string, string][]>((employeeName, index) => employeeNames.slice(index + 1).map(name => [employeeName, name]))
      .flat()
      .map<[DataSet, DataSet]>(([nameA, nameB]) => [
        dataset.find(({ employeeName }) => employeeName === nameA),
        dataset.find(({ employeeName }) => employeeName === nameB)
      ]);

    return pairs;
  }
}
