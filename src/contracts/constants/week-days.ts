export const WEEK_DAYS_KEYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] as const;

export type WeekDaysType = {
  readonly [K in typeof WEEK_DAYS_KEYS[number]]: string;
};

export const WEEK_DAYS: WeekDaysType = {
  MO: 'Monday',
  TU: 'Tuesday',
  WE: 'Wednesday',
  TH: 'Thursday',
  FR: 'Friday',
  SA: 'Saturday',
  SU: 'Sunday'
};
