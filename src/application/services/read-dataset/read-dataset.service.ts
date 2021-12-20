import * as fs from 'fs';
import * as readline from 'readline';
import * as stream from 'stream';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ReadDatasetService {
  private readonly _path = 'src/shared/mocks';
  private readonly _fileName = 'dataset.txt';
  private readonly _maxDatasetLength = 3;
  private readonly _logger = new Logger(ReadDatasetService.name);

  readDatasetFromFile() {
    const inStream = fs.createReadStream(`${this._path}/${this._fileName}`);

    return this.readDataset(inStream);
  }

  readDatasetFromText(text: string) {
    const buffer = Buffer.from(text);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    return this.readDataset(bufferStream);
  }

  private async readDataset(inStream: NodeJS.ReadableStream) {
    return new Promise<string[]>(resolve => {
      const readInterface = readline.createInterface({
        input: inStream,
        output: process.stdout,
        terminal: false
      });
      const lines = [];
      readInterface.on('line', line => {
        if (!!line.trim()) {
          lines.push(line);
        }
      });
      inStream.on('end', () => {
        if (lines.length < this._maxDatasetLength) {
          this._logger.warn(`::${this.readDataset.name}:: Only at least ${this._maxDatasetLength} datasets are allowed`);
          resolve([]);

          return;
        }
        resolve(lines);
      });
    });
  }
}
