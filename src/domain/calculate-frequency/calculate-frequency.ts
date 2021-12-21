import { WARN } from '@contracts/constants/logger';
import { WEEK_DAYS_KEYS } from '@contracts/constants/week-days';

export class CalculateFrequency {
  constructor(private readonly _dataset: string[]) {}

  calc() {
    const employeeNames = [];
    for (const data of this._dataset) {
      const [employeeName, times] = this.extractData(data.replace(/\s+/g, ''));
      if (employeeNames.some(name => name === employeeName)) {
        WARN(`The employee ${employeeName} is already part, it will be canceled ${data}`);
      }
      this.extractValidTimes(times);
      employeeNames.push(employeeName);
    }
  }

  private extractData(data: string): [string, string[]] {
    const partition = data.indexOf('=');

    return [data.substring(0, partition), data.substring(partition + 1).split(',')];
  }

  private extractValidTimes(times: string[]) {
    const days = [];
    const validTimes = [];
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

    return validTimes;
  }
}
