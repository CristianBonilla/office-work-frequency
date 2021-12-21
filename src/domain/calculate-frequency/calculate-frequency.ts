import { WARN } from '@contracts/constants/logger';
import { WEEK_DAYS_KEYS } from '@contracts/constants/week-days';
import { DataSet, Times } from '@contracts/DTO/dataset';

export class CalculateFrequency {
  constructor(private readonly _dataset: string[]) {}

  calc() {
    this.employeePairs();
  }

  private employeePairs() {
    const dataset = this.extractValidDataset();
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

  private extractTimes(time: string): Times {
    const [start, end] = time
      .substring(2)
      .split('-')
      .map(value => value.split(':').map(Number) as [number, number]);

    return { start, end };
  }

  private extractValidDataset() {
    const dataset: DataSet[] = [];
    for (const data of this._dataset) {
      const [employeeName, times] = this.extractData(data.replace(/\s+/g, ''));
      if (dataset.some(({ employeeName: name }) => name === employeeName)) {
        WARN(`The employee ${employeeName} is already part, it will be canceled ${data}`);

        continue;
      }
      const days: string[] = [];
      const validTimes: string[] = [];
      for (const time of times) {
        const day = time.replace(/[^A-Za-z]/g, '');
        if (!WEEK_DAYS_KEYS.some(key => key === day)) {
          WARN(`It is not part of the days of the week, it will not be taken into account ${time}`);

          continue;
        }
        if (days.some(uniqueDay => uniqueDay === day)) {
          WARN(`The day ${day} is already part of time, it will be canceled ${time}`);

          continue;
        }
        days.push(day);
        validTimes.push(time);
      }
      dataset.push({ employeeName, times: validTimes.map(this.extractTimes) });
    }

    return dataset;
  }

  private extractData(data: string): [string, string[]] {
    const partition = data.indexOf('=');

    return [data.substring(0, partition), data.substring(partition + 1).split(',')];
  }
}
