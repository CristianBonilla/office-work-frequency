import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'dataset' })
export class DatasetQuestion {
  @Question({
    message: 'Enter the frequency of office work for each employee...',
    name: 'dataset',
    type: 'editor'
  })
  passedDatasetFile(value: string) {
    return value;
  }
}
