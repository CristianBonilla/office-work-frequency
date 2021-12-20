import { CHOICES } from '@contracts/choices/choices';
import { Logger } from '@nestjs/common';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';

const [, CUSTOM_DATASET] = CHOICES;

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
    this._logger.log('Calculate how often employees work in the office\n');
    let type = input;
    if (!!type) {
      return;
    }
    const typeQuestion = await this._inquirer.ask<{ type: 'string' }>('type', null);
    type = typeQuestion.type;
    if (CUSTOM_DATASET === type) {
      const customDatasetQuestion = await this._inquirer.ask<{ 'custom-dataset': 'string' }>('custom-dataset', null);
      const customDataset = await this._readFile.readDatasetFromText(customDatasetQuestion['custom-dataset']);
      console.log(customDataset);
    } else {
      const dataset = await this._readFile.readDatasetFromFile();
      console.log(dataset);
    }
  }
}
