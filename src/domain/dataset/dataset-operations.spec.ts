import { Time } from '@contracts/DTO/dataset';
import { DatasetOperations } from '@domain/dataset/dataset-operations';
import { TimeLapsesInHours } from '@domain/time-lapses-in-hours';
import { TimeLapsesInMinutes } from '@domain/time-lapses-in-minutes';
import { DATASET, DATASET_LIST, DATASET_RESULT } from '@test/dataset/dataset';

describe('DatasetOperations', () => {
  let datasetOperations: DatasetOperations;

  let coincidenceInHoursSpy: jest.SpyInstance<boolean, []>;
  let coincidenceInMinutesSpy: jest.SpyInstance<boolean, []>;

  beforeEach(() => {
    datasetOperations = new DatasetOperations(DATASET);

    coincidenceInHoursSpy = jest.spyOn(TimeLapsesInHours.prototype, 'hasCoincidences');
    coincidenceInMinutesSpy = jest.spyOn(TimeLapsesInMinutes.prototype, 'hasCoincidences');
  });

  afterEach(() => {
    coincidenceInHoursSpy.mockClear();
    coincidenceInMinutesSpy.mockClear();
  });

  it('should correctly create dataset operations class', () => {
    // assert
    expect(datasetOperations).toBeDefined();
  });

  it('should get the employee pairs extracted from the dataset', () => {
    // arrange
    const extractSpy = jest.spyOn(datasetOperations['_extractDataset'], 'extract').mockReturnValue(DATASET_LIST);

    // act
    const employeePairs = datasetOperations['getEmployeePairs']();

    // assert
    expect(extractSpy).toBeCalled();
    expect(employeePairs).toBeDefined();
    expect(employeePairs).toEqual([[DATASET_LIST[0], DATASET_LIST[1]]]);
  });

  it('should return the time coincidence in hours as true', () => {
    // arrange
    const timeA: Omit<Time, 'day'> = {
      start: {
        hour: 10,
        minute: 0
      },
      end: {
        hour: 13,
        minute: 15
      }
    };
    const timeB: Omit<Time, 'day'> = {
      start: {
        hour: 12,
        minute: 0
      },
      end: {
        hour: 14,
        minute: 0
      }
    };
    const getCoincidenceInHoursSpy = () => coincidenceInHoursSpy.mock.results[0].value;

    // act
    const coincidence = datasetOperations['hasTimeCoincidences'](timeA, timeB);

    // assert
    expect(coincidenceInHoursSpy).toBeCalled();
    expect(getCoincidenceInHoursSpy()).toBeTruthy();
    expect(coincidenceInMinutesSpy).not.toBeCalled();
    expect(coincidence).toBeTruthy();
  });

  it('should return the time coincidence in minutes as true', () => {
    // arrange
    const timeA: Omit<Time, 'day'> = {
      start: {
        hour: 11,
        minute: 10
      },
      end: {
        hour: 11,
        minute: 30
      }
    };
    const timeB: Omit<Time, 'day'> = {
      start: {
        hour: 10,
        minute: 0
      },
      end: {
        hour: 11,
        minute: 40
      }
    };
    const getCoincidenceInHoursSpy = () => coincidenceInHoursSpy.mock.results[0].value;
    const getCoincidenceInMinutesSpy = () => coincidenceInMinutesSpy.mock.results[0].value;

    // act
    const coincidence = datasetOperations['hasTimeCoincidences'](timeA, timeB);

    // assert
    expect(coincidenceInHoursSpy).toBeCalled();
    expect(getCoincidenceInHoursSpy()).toBeFalsy();
    expect(coincidenceInMinutesSpy).toBeCalled();
    expect(getCoincidenceInMinutesSpy()).toBeTruthy();
    expect(coincidence).toBeTruthy();
  });

  it('should correctly return the result of the data sets', () => {
    // arrange
    const employeePairsSpy = jest
      .spyOn<any, 'getEmployeePairs'>(datasetOperations, 'getEmployeePairs')
      .mockReturnValue([[DATASET_LIST[0], DATASET_LIST[1]]]);
    const hasCoincidencesSpy = jest.spyOn<any, 'hasTimeCoincidences'>(datasetOperations, 'hasTimeCoincidences');
    const getHasCoincidencesSpy = () => hasCoincidencesSpy.mock.results.every(({ value }) => !!value);

    // act
    const datasetResult = datasetOperations.getDatasetResult();

    // assert
    expect(employeePairsSpy).toBeCalled();
    expect(hasCoincidencesSpy).toBeCalledTimes(3);
    expect(getHasCoincidencesSpy()).toBeTruthy();
    expect(datasetResult).toEqual(DATASET_RESULT);
  });
});
