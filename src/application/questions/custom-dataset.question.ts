import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'custom-dataset' })
export class CustomDatasetQuestion {
  @Question({
    message: 'Enter the frequency of office work for each employee...',
    name: 'custom-dataset',
    type: 'editor'
  })
  passedCustom(value: string) {
    return value;
  }
}
