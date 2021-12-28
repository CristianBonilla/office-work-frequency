import { TimeLapsesInHours } from '@domain/time-lapses-in-hours';

describe('TimeLapsesInHours', () => {
  let timeLapsesInHours: TimeLapsesInHours;

  beforeEach(() => {
    timeLapsesInHours = new TimeLapsesInHours(
      {
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
        start: {
          hour: 12,
          minute: 0
        },
        end: {
          hour: 14,
          minute: 0
        }
      }
    );
  });

  it('should correctly create the class of times lapses in hours', () => {
    // assert
    expect(timeLapsesInHours).toBeDefined();
  });

  it('should coincide the 2 times with the first lapse', () => {
    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(timeLapsesInHours['first']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the second lapse', () => {
    // arrange
    const timeLapsesInHours = new TimeLapsesInHours(
      {
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
        start: {
          hour: 12,
          minute: 0
        },
        end: {
          hour: 14,
          minute: 0
        }
      }
    );

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(timeLapsesInHours['second']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the third lapse', () => {
    // arrange
    const timeLapsesInHours = new TimeLapsesInHours(
      {
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
        start: {
          hour: 13,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 15
        }
      }
    );

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(timeLapsesInHours['third']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the fourth lapse', () => {
    // arrange
    const timeLapsesInHours = new TimeLapsesInHours(
      {
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
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 15
        }
      }
    );

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(timeLapsesInHours['fourth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the fifth lapse', () => {
    // arrange
    const timeLapsesInHours = new TimeLapsesInHours(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 15
        }
      },
      {
        start: {
          hour: 12,
          minute: 0
        },
        end: {
          hour: 14,
          minute: 0
        }
      }
    );

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(timeLapsesInHours['fifth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });
});
