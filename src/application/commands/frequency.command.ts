import { Logger } from '@nestjs/common';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { LOG } from '@contracts/constants/logger';
import { CHOICES } from '@contracts/constants/choices';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';
import { FrequencyService } from '@application/services/frequency/frequency.service';

const [DATASET_FILE, CUSTOM] = CHOICES;

@Command({
  name: 'frequency',
  arguments: '[frequency]',
  options: { isDefault: true },
  description: 'Calculate how often employees work in the office'
})
export class FrequencyCommand implements CommandRunner {
  private readonly _logger = new Logger(FrequencyCommand.name);
  private _tryAgain = false;

  constructor(
    private readonly _inquirer: InquirerService,
    private readonly _readFile: ReadDatasetService,
    private readonly _frequency: FrequencyService
  ) {}

  async run([input]: string[]) {
    const methodName = this.run.name;
    if (!this._tryAgain) {
      this._logger.log(`::${methodName}:: starting...`);
    }

    LOG('Calculate how often employees work in the office');

    let type = input;
    if (!type || (type !== DATASET_FILE && type !== CUSTOM)) {
      const typeQuestion = await this._inquirer.ask<{ type: 'string' }>('type', null);
      type = typeQuestion.type;
    }
    let dataset: string[];
    if (DATASET_FILE === type) {
      dataset = await this._readFile.readDatasetFromFile();
    } else {
      const customDatasetQuestion = await this._inquirer.ask<{ 'custom-dataset': 'string' }>('custom-dataset', null);
      dataset = await this._readFile.readDatasetFromText(customDatasetQuestion['custom-dataset']);
    }
    const table = this._frequency.calcFrequency(dataset);
    console.log(table.toString());
    const tryAgainQuestion = await this._inquirer.ask<{ 'try-again': 'string' }>('try-again', null);
    this._tryAgain = !!tryAgainQuestion['try-again'];
    if (this._tryAgain) {
      this.run([null]);

      return;
    }
    this._tryAgain = false;

    this._logger.log(`::${methodName}:: has been completed`);
  }
}
