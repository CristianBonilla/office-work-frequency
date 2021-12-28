import * as fs from 'fs';
import * as readline from 'readline';
import * as stream from 'stream';
import { Test, TestingModule } from '@nestjs/testing';
import { ReadDatasetService } from './read-dataset.service';
import { DATASET, DATASET_TEXT } from '@test/dataset/dataset';
import { ERROR } from '@contracts/constants/logger';
import { asMock } from '@test/helpers';

jest.mock('@contracts/constants/logger');
const mockERROR = asMock(ERROR);

describe('ReadFileService', () => {
  let service: ReadDatasetService;

  let bufferFromSpy: jest.SpyInstance<Buffer, Parameters<typeof Buffer['from']>>;
  let streamPassThroughSpy: jest.SpyInstance<stream.PassThrough, ConstructorParameters<typeof stream.PassThrough>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadDatasetService]
    }).compile();

    service = module.get<ReadDatasetService>(ReadDatasetService);
    bufferFromSpy = jest.spyOn(Buffer, 'from');
    streamPassThroughSpy = jest.spyOn(stream, 'PassThrough');
  });

  afterEach(() => {
    bufferFromSpy.mockClear();
    streamPassThroughSpy.mockClear();
  });

  it('should correctly create read dataset service', () => {
    // assert
    expect(service).toBeDefined();
  });

  it('should read the text file correctly and get the dataset', async () => {
    // arrange
    const path = 'test/dataset';
    const fileName = 'dataset.txt';
    const inStream = fs.createReadStream(`${path}/${fileName}`);
    const readlineOptions: readline.ReadLineOptions = {
      input: inStream,
      output: process.stdout,
      terminal: false
    };
    jest.spyOn(fs, 'createReadStream').mockReturnValue(inStream);
    jest.spyOn(readline, 'createInterface');
    const readlineOnSpy = jest.spyOn(readline.Interface.prototype, 'on');
    jest.spyOn(inStream, 'on');

    // act
    const dataset = await service.readDatasetFromFile();

    // assert
    expect(fs.createReadStream).toBeCalled();
    expect(readline.createInterface).toBeCalledWith(readlineOptions);
    expect(readlineOnSpy).toBeCalled();
    expect(inStream.on).toBeCalled();
    expect(dataset).toEqual(DATASET);
  });

  it('should read the dataset from a custom source', async () => {
    // arrange
    const buffer = Buffer.from(DATASET_TEXT);
    const bufferStream = new stream.PassThrough();
    const readlineOptions: readline.ReadLineOptions = {
      input: bufferStream,
      output: process.stdout,
      terminal: false
    };
    bufferFromSpy.mockImplementationOnce(() => buffer);
    streamPassThroughSpy.mockImplementationOnce(() => bufferStream);
    const passThroughtEndSpy = jest.spyOn(bufferStream, 'end');
    jest.spyOn(readline, 'createInterface');
    const readlineOnSpy = jest.spyOn(readline.Interface.prototype, 'on');
    jest.spyOn(bufferStream, 'on');

    // act
    const dataset = await service.readDatasetFromText(DATASET_TEXT);

    // assert
    expect(bufferFromSpy).toBeCalled();
    expect(streamPassThroughSpy).toBeCalled();
    expect(passThroughtEndSpy).toBeCalledWith(buffer);
    expect(readline.createInterface).toBeCalledWith(readlineOptions);
    expect(readlineOnSpy).toBeCalled();
    expect(bufferStream.on).toBeCalled();
    expect(dataset).toEqual(DATASET);
  });

  it('should return an error message if the dataset does not reach the maximum length', async () => {
    // arrange
    const datasetText = 'RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00';

    // act
    const dataset = await service.readDatasetFromText(datasetText);

    // arrange
    expect(mockERROR).toBeCalledWith(`Only at least ${service['_maxDatasetLength']} datasets are allowed`);
    expect(dataset).toEqual([]);
  });
});
