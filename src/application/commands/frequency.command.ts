import { Command, CommandRunner, InquirerService } from 'nest-commander';

@Command({
  name: 'frequency',
  arguments: '[frequency]',
  options: { isDefault: true },
  description: 'Calculate how often employees work in the office'
})
export class FrequencyRunner implements CommandRunner {
  constructor(private readonly _inquirer: InquirerService) {}

  async run([input]: string[]) {
    let value = input;
    if (!value) {
      const question = await this._inquirer.ask<{ type: 'string' }>('common', null);
      value = question.type;
    }
  }
}
