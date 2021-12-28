import { TimeLapsesInMinutes } from '@domain/time-lapses-in-minutes';

describe('TimeLapsesInMinutes', () => {
  let timeLapsesInMinutes: TimeLapsesInMinutes;

  beforeEach(() => {
    timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 30
        },
        end: {
          hour: 12,
          minute: 40
        }
      }
    );
  });

  it('should correctly create class of time lapses in minutes', () => {
    // assert
    expect(timeLapsesInMinutes).toBeDefined();
  });

  it('should coincide the 2 times with the first lapse', () => {
    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['first']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the second lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 30
        },
        end: {
          hour: 12,
          minute: 40
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['second']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the third lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 30
        }
      },
      {
        start: {
          hour: 11,
          minute: 30
        },
        end: {
          hour: 12,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['third']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the fourth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 30
        },
        end: {
          hour: 12,
          minute: 40
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['fourth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the fifth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 30
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['fifth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the sixth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 40
        }
      },
      {
        start: {
          hour: 10,
          minute: 30
        },
        end: {
          hour: 11,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['sixth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the seventh lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 30
        },
        end: {
          hour: 12,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['seventh']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the eighth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 40
        }
      },
      {
        start: {
          hour: 11,
          minute: 30
        },
        end: {
          hour: 12,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['eighth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the nineth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 40
        }
      },
      {
        start: {
          hour: 10,
          minute: 20
        },
        end: {
          hour: 10,
          minute: 50
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['nineth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the tenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 20
        },
        end: {
          hour: 10,
          minute: 50
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['tenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the eleventh lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 50
        }
      },
      {
        start: {
          hour: 10,
          minute: 20
        },
        end: {
          hour: 10,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['eleventh']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the twelfth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 20
        },
        end: {
          hour: 10,
          minute: 40
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 50
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['twelfth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the thirteenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 0
        },
        end: {
          hour: 15,
          minute: 26
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['thirteenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the fourteenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 11,
          minute: 0
        },
        end: {
          hour: 15,
          minute: 26
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['fourteenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the fifteenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 11,
          minute: 10
        },
        end: {
          hour: 15,
          minute: 26
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['fifteenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the sixteenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 11,
          minute: 10
        },
        end: {
          hour: 11,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['sixteenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the seventeenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 15,
          minute: 26
        }
      },
      {
        start: {
          hour: 11,
          minute: 10
        },
        end: {
          hour: 11,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['seventeenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the eighteenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 10
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 15,
          minute: 26
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['eighteenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the nineteenth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 0
        },
        end: {
          hour: 15,
          minute: 26
        }
      },
      {
        start: {
          hour: 11,
          minute: 10
        },
        end: {
          hour: 11,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['nineteenth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the twentieth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 11,
          minute: 10
        },
        end: {
          hour: 11,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 11,
          minute: 40
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['twentieth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the twenty first lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 10
        },
        end: {
          hour: 10,
          minute: 50
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['twentyFirst']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the twenty second lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 10
        },
        end: {
          hour: 10,
          minute: 50
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['twentySecond']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the twenty third lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 10
        },
        end: {
          hour: 10,
          minute: 30
        }
      },
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 50
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['twentyThird']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should coincide the 2 times with the twenty fourth lapse', () => {
    // arrange
    const timeLapsesInMinutes = new TimeLapsesInMinutes(
      {
        start: {
          hour: 10,
          minute: 0
        },
        end: {
          hour: 10,
          minute: 50
        }
      },
      {
        start: {
          hour: 10,
          minute: 10
        },
        end: {
          hour: 10,
          minute: 30
        }
      }
    );

    // act
    const coincidence = timeLapsesInMinutes.hasCoincidences();

    // assert
    expect(timeLapsesInMinutes['twentyFourth']).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });
});
