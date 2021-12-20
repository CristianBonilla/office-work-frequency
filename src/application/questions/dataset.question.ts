import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'dataset' })
export class DatasetQuestion {
  @Question({
    message: 'Enter the frequency of office work for each employee...\n',
    name: 'dataset',
    type: 'input'
  })
  paseDatasetFile(value: string) {
    return value;
  }
}
