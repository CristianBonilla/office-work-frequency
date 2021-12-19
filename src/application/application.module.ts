import { Module } from '@nestjs/common';
import { CommonQuestions } from '@application/questions/common.questions';
import { FrequencyRunner } from '@application/commands/frequency.command';

@Module({
  imports: [],
  providers: [CommonQuestions, FrequencyRunner]
})
export class ApplicationModule {}
