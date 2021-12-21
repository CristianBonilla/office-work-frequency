import { WARN } from '@contracts/constants/logger';
import { WeekDaysType, WEEK_DAYS_KEYS } from '@contracts/constants/week-days';
import { DataSet, Times } from '@contracts/DTO/dataset';

export class CalculateFrequency {
  constructor(private readonly _dataset: string[]) {}

  calc() {
    const pairs = this.employeePairs();
    for (const [employeeA, employeeB] of pairs) {
      for (const key of WEEK_DAYS_KEYS) {
        const timeA = employeeA.times.find(({ day }) => day === key);
        const timeB = employeeB.times.find(({ day }) => day === key);
        if (!!timeA && !!timeB) {
          this.checkTime(timeA, timeB);
        }
      }
    }
  }

  private checkTime(timeA: Omit<Times, 'day'>, timeB: Omit<Times, 'day'>) {
    const {
      start: [startHourA, startMinuteA],
      end: [endHourA, endMinuteA]
    } = timeA;
    const {
      start: [startHourB, startMinuteB],
      end: [endHourB, endMinuteB]
    } = timeB;

    return this.check([startHourA, endHourA], [startHourB, endHourB]) && this.check([startMinuteA, endMinuteA], [startMinuteB, endMinuteB]);
  }

  private check(timeA: [number, number], timeB: [number, number]) {
    return (
      this.firstTimeLapse(timeA, timeB) ||
      this.secondTimeLapse(timeA, timeB) ||
      this.thirdTimeLapse(timeA, timeB) ||
      this.fourthTimeLapse(timeA, timeB) ||
      this.fifthTimeLapse(timeA, timeB)
    );
  }

  private firstTimeLapse([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    return startA === startB && endA === endB;
  }

  private secondTimeLapse([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    const A = startA >= startB && startA < endB && endA >= endB;
    const B = startB <= startA && endB > startA && endB <= endA;

    return A && B;
  }

  private thirdTimeLapse([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    const A = startA <= startB && endA > startB && endA <= endB;
    const B = startB >= startA && startB < endA && endB >= endA;

    return A && B;
  }

  private fourthTimeLapse([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    const A = startA >= startB && endA > startB && endA <= endB;
    const B = startB <= startA && endB > startA && endB >= endA;

    return A && B;
  }

  private fifthTimeLapse([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    const A = startA <= startB && endA > startB && endA >= endB;
    const B = startB >= startA && endB > startA && endB <= endA;

    return A && B;
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
    const day = time.substring(0, 2) as keyof WeekDaysType;
    const [start, end] = time
      .substring(2)
      .split('-')
      .map(value => value.split(':').map(Number) as [number, number]);

    return { day, start, end };
  }

  private extractValidDataset() {
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
}
