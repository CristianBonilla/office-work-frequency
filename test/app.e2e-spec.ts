import { InquirerService } from 'nest-commander';
import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import { CHOICES } from '@contracts/constants/choices';
import { AppModule } from '../src/app.module';

const [DATASET_FILE] = CHOICES;

describe('FrequencyCommand (e2e)', () => {
  let commandInstance: TestingModule;
  let inquirer: InquirerService;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [AppModule]
    }).compile();
    inquirer = commandInstance.get(InquirerService);
  });

  it('should call the "run" method', async () => {
    // arrange
    const askSpy = jest.spyOn(inquirer, 'ask').mockReturnValue(Promise.resolve(false));

    // act
    await CommandTestFactory.run(commandInstance, [DATASET_FILE]);

    // assert
    expect(askSpy).toBeCalled();
  });
});
