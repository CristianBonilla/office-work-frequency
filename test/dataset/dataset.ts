import { DataSet, DataSetResult } from '@contracts/DTO/dataset';

export const DATASET_TEXT = `RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00`;

export const DATASET: string[] = ['RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00', 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'];

export const DATASET_LIST: DataSet[] = [
  {
    employeeName: 'RENE',
    times: [
      {
        day: 'MO',
        start: {
          hour: 10,
          minute: 15
        },
        end: {
          hour: 12,
          minute: 0
        }
      },
      {
        day: 'TU',
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 0
        }
      },
      {
        day: 'TH',
        start: {
          hour: 13,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 15
        }
      },
      {
        day: 'SA',
        start: {
          hour: 14,
          minute: 0
        },
        end: {
          hour: 18,
          minute: 0
        }
      },
      {
        day: 'SU',
        start: {
          hour: 20,
          minute: 0
        },
        end: {
          hour: 21,
          minute: 0
        }
      }
    ]
  },
  {
    employeeName: 'ASTRID',
    times: [
      {
        day: 'MO',
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 0
        }
      },
      {
        day: 'TH',
        start: {
          hour: 12,
          minute: 0
        },
        end: {
          hour: 14,
          minute: 0
        }
      },
      {
        day: 'SU',
        start: {
          hour: 20,
          minute: 0
        },
        end: {
          hour: 21,
          minute: 0
        }
      }
    ]
  }
];

export const DATASET_RESULT: DataSetResult[] = [
  {
    employeePairs: [
      {
        employeeName: 'RENE',
        times: [
          {
            day: 'MO',
            start: {
              hour: 10,
              minute: 15
            },
            end: {
              hour: 12,
              minute: 0
            }
          },
          {
            day: 'TU',
            start: {
              hour: 10,
              minute: 0
            },
            end: {
              hour: 12,
              minute: 0
            }
          },
          {
            day: 'TH',
            start: {
              hour: 13,
              minute: 0
            },
            end: {
              hour: 13,
              minute: 15
            }
          },
          {
            day: 'SA',
            start: {
              hour: 14,
              minute: 0
            },
            end: {
              hour: 18,
              minute: 0
            }
          },
          {
            day: 'SU',
            start: {
              hour: 20,
              minute: 0
            },
            end: {
              hour: 21,
              minute: 0
            }
          }
        ]
      },
      {
        employeeName: 'ASTRID',
        times: [
          {
            day: 'MO',
            start: {
              hour: 10,
              minute: 0
            },
            end: {
              hour: 12,
              minute: 0
            }
          },
          {
            day: 'TH',
            start: {
              hour: 12,
              minute: 0
            },
            end: {
              hour: 14,
              minute: 0
            }
          },
          {
            day: 'SU',
            start: {
              hour: 20,
              minute: 0
            },
            end: {
              hour: 21,
              minute: 0
            }
          }
        ]
      }
    ],
    timeCoincidences: 3
  }
];
