import { Question, QuestionSet } from 'nest-commander';
import { CHOICES } from '@contracts/choices/choices';

@QuestionSet({ name: 'common' })
export class CommonQuestions {
  @Question({
    message: 'How do you want the data set?',
    name: 'type',
    type: 'list',
    choices: CHOICES
  })
  paseType(value: any) {
    return value;
  }
}
