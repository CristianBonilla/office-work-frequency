import { Module } from '@nestjs/common';
import { TypeQuestions } from '@application/questions/type.question';
import { CustomDatasetQuestion } from '@application/questions/custom-dataset.question';
import { FrequencyRunner } from '@application/commands/frequency.command';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';

@Module({
  imports: [],
  providers: [TypeQuestions, CustomDatasetQuestion, FrequencyRunner, ReadDatasetService]
})
export class ApplicationModule {}
