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
    // arrange
    expect(timeLapsesInHours).toBeDefined();
  });

  it('should coincide the 2 times with the first lapse', () => {
    // arrange
    const firstSpy = jest.spyOn<any, 'first'>(timeLapsesInHours, 'first', 'get');

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(firstSpy).toBeCalled();
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
    const secondSpy = jest.spyOn<any, 'second'>(timeLapsesInHours, 'second', 'get');

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(secondSpy).toBeCalled();
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
    const thirdSpy = jest.spyOn<any, 'third'>(timeLapsesInHours, 'third', 'get');

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(thirdSpy).toBeCalled();
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
    const fourthSpy = jest.spyOn<any, 'fourth'>(timeLapsesInHours, 'fourth', 'get');

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(fourthSpy).toBeCalled();
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
    const fifthSpy = jest.spyOn<any, 'fifth'>(timeLapsesInHours, 'fifth', 'get');

    // act
    const coincidence = timeLapsesInHours.hasCoincidences();

    // assert
    expect(fifthSpy).toBeCalled();
    expect(coincidence).toBeTruthy();
  });
});
