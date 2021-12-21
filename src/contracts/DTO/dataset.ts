import { WeekDaysType } from '@contracts/constants/week-days';

export interface Times {
  day: keyof WeekDaysType;
  start: [number, number];
  end: [number, number];
}

export interface DataSet {
  employeeName: string;
  times: Times[];
}

export interface DataSetResult {
  employeePairs: [DataSet, DataSet];
  timeCoincidences: number;
}
