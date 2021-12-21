export interface Times {
  start: [number, number];
  end: [number, number];
}

export interface DataSet {
  employeeName: string;
  times: Times[];
}
