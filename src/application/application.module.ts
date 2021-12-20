import { Module } from '@nestjs/common';
import { TypeQuestions } from '@application/questions/type.question';
import { DatasetQuestion } from '@application/questions/dataset.question';
import { FrequencyRunner } from '@application/commands/frequency.command';

@Module({
  imports: [],
  providers: [TypeQuestions, DatasetQuestion, FrequencyRunner]
})
export class ApplicationModule {}
