import { Question, QuestionSet } from 'nest-commander';
import { CHOICES } from '@contracts/constants/choices';

@QuestionSet({ name: 'type' })
export class TypeQuestion {
  @Question({
    message: 'How do you want the data set?',
    name: 'type',
    type: 'list',
    choices: CHOICES
  })
  passedType(value: string) {
    return value;
  }
}
