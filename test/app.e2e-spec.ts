import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CHOICES } from '@contracts/constants/choices';

const [DATASET_FILE] = CHOICES;

describe('FrequencyCommand (e2e)', () => {
  let commandInstance: TestingModule;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [AppModule]
    }).compile();
  });

  it('should call the "run" method', async () => {
    await CommandTestFactory.run(commandInstance, [DATASET_FILE]);
  });
});
