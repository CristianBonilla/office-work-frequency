import { CHOICES } from '@contracts/choices/choices';
import { Logger } from '@nestjs/common';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';

const [, MANUALLY] = CHOICES;

@Command({
  name: 'frequency',
  arguments: '[frequency]',
  options: { isDefault: true },
  description: 'Calculate how often employees work in the office'
})
export class FrequencyRunner implements CommandRunner {
  private readonly _logger = new Logger(FrequencyRunner.name);

  constructor(private readonly _inquirer: InquirerService, private readonly _readFile: ReadDatasetService) {}

  async run([input]: string[]) {
    this._logger.log('Calculate how often employees work in the office');
    let type = input;
    if (!!type) {
      return;
    }
    const typeQuestion = await this._inquirer.ask<{ type: 'string' }>('type', null);
    type = typeQuestion.type;
    if (MANUALLY === type) {
      const datasetQuestion = await this._inquirer.ask<{ dataset: 'string' }>('dataset', null);
      const dataset = await this._readFile.readDatasetFromText(datasetQuestion.dataset);
      console.log(dataset);
    } else {
      const dataset = await this._readFile.readDatasetFromFile();
      console.log(dataset);
    }
  }
}
