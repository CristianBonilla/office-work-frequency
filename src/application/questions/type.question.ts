import { Question, QuestionSet } from 'nest-commander';
import { CHOICES } from '@contracts/choices/choices';

@QuestionSet({ name: 'type' })
export class TypeQuestions {
  @Question({
    message: 'How do you want the data set?',
    name: 'type',
    type: 'list',
    choices: CHOICES
  })
  paseType(value: string) {
    return value;
  }
}
