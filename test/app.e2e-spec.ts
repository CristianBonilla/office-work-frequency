import { InquirerService } from 'nest-commander';
import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import { CHOICES } from '@contracts/constants/choices';
import { AppModule } from '../src/app.module';

const [DATASET_FILE] = CHOICES;

describe('FrequencyCommand (e2e)', () => {
  let command: TestingModule;
  let inquirer: InquirerService;

  beforeAll(async () => {
    command = await CommandTestFactory.createTestingCommand({
      imports: [AppModule]
    }).compile();
    inquirer = command.get(InquirerService);
  });

  it('should invoke the "run" method', async () => {
    // arrange
    jest.spyOn(inquirer, 'ask').mockReturnValue(Promise.resolve({ 'try-again': false }));

    // act
    await CommandTestFactory.run(command, [DATASET_FILE]);

    // assert
    expect(inquirer.ask).toBeCalled();
  });
});
