import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'try-again' })
export class TryAgainQuestion {
  @Question({
    message: 'Do you want to try loading a dataset again?',
    name: 'try-again',
    type: 'confirm'
  })
  passedTryAgain(value: any) {
    return value;
  }
}
