import Table = require('cli-table');
import { InquirerService } from 'nest-commander';
import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import { LOG } from '@contracts/constants/logger';
import { CHOICES } from '@contracts/constants/choices';
import { ApplicationModule } from '@application/application.module';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';
import { FrequencyService } from '@application/services/frequency/frequency.service';
import { asMock } from '@test/helpers';

jest.mock('@contracts/constants/logger');
const mockLOG = asMock(LOG);

const [DATASET_FILE, CUSTOM] = CHOICES;

describe('FrequencyCommand', () => {
  let frequencyCommand: TestingModule;
  let inquirer: InquirerService;
  let readFile: ReadDatasetService;
  let frequency: FrequencyService;

  let logSpy: jest.SpyInstance<void, Parameters<Console['log']>>;
  let askSpy: jest.SpyInstance<Promise<any>, Parameters<InquirerService['ask']>>;

  beforeEach(async () => {
    frequencyCommand = await CommandTestFactory.createTestingCommand({
      imports: [ApplicationModule]
    }).compile();
    inquirer = frequencyCommand.get(InquirerService);
    readFile = frequencyCommand.get(ReadDatasetService);
    frequency = frequencyCommand.get(FrequencyService);

    logSpy = jest.spyOn(console, 'log');
    askSpy = jest.spyOn(inquirer, 'ask');
  });

  afterEach(() => {
    mockLOG.mockClear();
    logSpy.mockClear();
    askSpy.mockClear();
  });

  it('should invoke the "run" method and read the dataset from the file', async () => {
    // arrange
    const dataset: string[] = ['DATASET'];
    const table = new Table();
    askSpy
      .mockImplementationOnce(() => Promise.resolve({ type: DATASET_FILE }))
      .mockImplementationOnce(() => Promise.resolve({ 'try-again': false }));
    jest.spyOn(readFile, 'readDatasetFromFile').mockReturnValue(Promise.resolve(dataset));
    jest.spyOn(frequency, 'calcFrequency').mockReturnValue(table);

    // act
    await CommandTestFactory.run(frequencyCommand, []);

    // assert
    expect(mockLOG).toBeCalledWith('Calculate how often employees work in the office');
    expect(askSpy).toBeCalledTimes(2);
    expect(readFile.readDatasetFromFile).toBeCalled();
    expect(frequency.calcFrequency).toBeCalledWith(dataset);
    expect(logSpy).toBeCalledWith(table.toString());
  });

  it('should invoke the "run" method and read the custom dataset', async () => {
    // arrange
    const customDataset = 'CUSTOM_DATASET';
    const dataset: string[] = [customDataset];
    const table = new Table();
    askSpy
      .mockImplementationOnce(() => Promise.resolve({ type: CUSTOM }))
      .mockImplementationOnce(() => Promise.resolve({ 'custom-dataset': customDataset }))
      .mockImplementationOnce(() => Promise.resolve({ 'try-again': false }));
    jest.spyOn(readFile, 'readDatasetFromText').mockReturnValue(Promise.resolve(dataset));
    jest.spyOn(frequency, 'calcFrequency').mockReturnValue(table);

    // act
    await CommandTestFactory.run(frequencyCommand, []);

    // assert
    expect(mockLOG).toBeCalledWith('Calculate how often employees work in the office');
    expect(askSpy).toBeCalledTimes(3);
    expect(readFile.readDatasetFromText).toBeCalledWith(customDataset);
    expect(frequency.calcFrequency).toBeCalledWith(dataset);
    expect(logSpy).toBeCalledWith(table.toString());
  });

  it('should invoke the "run" method and do a new retry again', async () => {
    // arrange
    const dataset: string[] = ['DATASET'];
    const table = new Table();
    askSpy
      .mockImplementationOnce(() => Promise.resolve({ 'try-again': true }))
      .mockImplementationOnce(() => Promise.resolve({ type: DATASET_FILE }))
      .mockImplementationOnce(() => Promise.resolve({ 'try-again': false }));
    jest.spyOn(readFile, 'readDatasetFromFile').mockReturnValue(Promise.resolve(dataset));
    jest.spyOn(frequency, 'calcFrequency').mockReturnValue(table);

    // act
    await CommandTestFactory.run(frequencyCommand, [DATASET_FILE]);

    // assert
    expect(mockLOG).toBeCalledTimes(2);
    expect(mockLOG).toBeCalledWith('Calculate how often employees work in the office');
    expect(askSpy).toBeCalledTimes(3);
    expect(readFile.readDatasetFromFile).toBeCalledTimes(2);
    expect(frequency.calcFrequency).toBeCalledTimes(2);
    expect(frequency.calcFrequency).toBeCalledWith(dataset);
    expect(logSpy).toBeCalledTimes(2);
    expect(logSpy).toBeCalledWith(table.toString());
  });
});
