import { ExtractDataset } from '@domain/dataset/extract-dataset';
import { DATASET_LIST, DATASET } from '@test/dataset/dataset';
import { WARN } from '@contracts/constants/logger';
import { asMock } from '@test/helpers';

jest.mock('@contracts/constants/logger');
const mockWARN = asMock(WARN);

describe('ExtractDataset', () => {
  let extractDataset: ExtractDataset;

  beforeEach(() => {
    extractDataset = new ExtractDataset(DATASET);
  });

  afterEach(() => {
    mockWARN.mockClear();
  });

  it('should successfully create the extract dataset instance', () => {
    // assert
    expect(extractDataset).toBeDefined();
  });

  it('should correctly extract the dataset', () => {
    // arrange
    jest.spyOn<any, 'checkFormat'>(extractDataset, 'checkFormat');
    jest.spyOn<any, 'extractData'>(extractDataset, 'extractData');
    jest.spyOn<any, 'extractTimes'>(extractDataset, 'extractTimes');
    const totalTimes = DATASET_LIST.reduce((previous, { times }) => (previous += times.length), 0);

    // act
    const extracted = extractDataset.extract();

    // assert
    expect(extractDataset['checkFormat']).toBeCalledTimes(2);
    expect(extractDataset['extractData']).toBeCalledTimes(2);
    expect(extractDataset['extractTimes']).toBeCalledTimes(totalTimes);
    expect(extracted).toEqual(DATASET_LIST);
    expect(mockWARN).not.toBeCalled();
  });

  it('should return a message that a dataset is not formatted and cancel it', () => {
    // arrange
    const dataset: string[] = ['RENE=MO10:15-12:00,TU10:00-12:00,, TH13:00-13:15,SA14:00-18:00', 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'];
    const extractDataset = new ExtractDataset(dataset);
    jest.spyOn<any, 'checkFormat'>(extractDataset, 'checkFormat');

    // act
    const extracted = extractDataset.extract();

    // assert
    expect(extractDataset['checkFormat']).toBeCalledTimes(2);
    expect(mockWARN).toBeCalledWith(`The dataset does not conform to the established format, it will be canceled\n${dataset[0]}`);
    expect(extracted).toEqual([DATASET_LIST[1]]);
  });

  it('should return a message if there are duplicate employees within the dataset and cancel it', () => {
    // arrange
    const dataset: string[] = ['RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00', 'RENE=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'];
    const extractDataset = new ExtractDataset(dataset);

    // act
    const extracted = extractDataset.extract();

    // assert
    expect(mockWARN).toBeCalledWith(`The employee RENE is already part, it will be canceled\n${dataset[1]}`);
    expect(mockWARN).toBeCalledTimes(1);
    expect(extracted).toEqual([DATASET_LIST[0]]);
  });

  it('should return a message if the days in the dataset do not match the weekdays and cancel it', () => {
    // arrange
    const fakeTime = 'FO19:33-21:00';
    const dataset: string[] = ['RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00', `ASTRID=${fakeTime},TH12:00-14:00,SU20:00-21:00`];
    const extractDataset = new ExtractDataset(dataset);
    const datasetList = DATASET_LIST.map(dataset => ({ ...dataset }));
    datasetList[1].times = datasetList[1].times.slice(1);
    jest.spyOn<any, 'checkFormat'>(extractDataset, 'checkFormat').mockReturnValue(true);

    // act
    const extracted = extractDataset.extract();

    // assert
    expect(mockWARN).toBeCalledWith(`It is not part of the days of the week, it will not be taken into account ${fakeTime}`);
    expect(mockWARN).toBeCalledTimes(1);
    expect(extracted).toEqual(datasetList);
  });

  it('should return a message if there are duplicate days within the dataset time and cancel it', () => {
    // arrange
    const dataset: string[] = ['RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00', `ASTRID=MO10:00-12:00,TH12:00-14:00,TH11:00-20:16,TH08:00-12:37,SU20:00-21:00`];
    const extractDataset = new ExtractDataset(dataset);

    // act
    const extracted = extractDataset.extract();

    // assert
    expect(mockWARN).toBeCalledWith(`The day TH is already part of time, it will be canceled TH11:00-20:16`);
    expect(mockWARN).toBeCalledWith(`The day TH is already part of time, it will be canceled TH08:00-12:37`);
    expect(mockWARN).toBeCalledTimes(2);
    expect(extracted).toEqual(DATASET_LIST);
  });
});
