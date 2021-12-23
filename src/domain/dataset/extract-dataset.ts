import { WARN } from '@contracts/constants/logger';
import { WeekDaysType, WEEK_DAYS_KEYS } from '@contracts/constants/week-days';
import { DataSet, Time, TimeDetail } from '@contracts/DTO/dataset';

export class ExtractDataset {
  constructor(private readonly _dataset: string[]) {}

  extract() {
    const dataset: DataSet[] = [];
    for (const data of this._dataset) {
      const [name, times] = this.extractData(data.replace(/\s+/g, ''));
      if (dataset.some(({ employeeName }) => employeeName === name)) {
        WARN(`The employee ${name} is already part, it will be canceled ${data}`);

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
      dataset.push({ employeeName: name, times: validTimes.map(this.extractTimes) });
    }

    return dataset;
  }

  private extractData(data: string): [string, string[]] {
    const partition = data.indexOf('=');

    return [data.substring(0, partition), data.substring(partition + 1).split(',')];
  }

  private extractTimes(time: string): Time {
    const day = time.substring(0, 2) as keyof WeekDaysType;
    const [start, end] = time
      .substring(2)
      .split('-')
      .map(value => value.split(':').map(Number) as [number, number])
      .map<TimeDetail>(([hour, minute]) => ({ hour, minute }));

    return { day, start, end };
  }
}
