import { WeekDaysType } from '@contracts/constants/week-days';

export interface TimeDetail {
  hour: number;
  minute: number;
}

export interface Time {
  day: keyof WeekDaysType;
  start: TimeDetail;
  end: TimeDetail;
}

export interface DataSet {
  employeeName: string;
  times: Time[];
}

export interface DataSetResult {
  employeePairs: [DataSet, DataSet];
  timeCoincidences: number;
}
