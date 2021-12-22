import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { DomainModule } from '@domain/domain.module';
import { TypeQuestions } from '@application/questions/type.question';
import { CustomDatasetQuestion } from '@application/questions/custom-dataset.question';
import { FrequencyRunner } from '@application/commands/frequency.command';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';
import { FrequencyService } from '@application/services/frequency/frequency.service';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [TypeQuestions, CustomDatasetQuestion, FrequencyRunner, ReadDatasetService, FrequencyService]
})
export class ApplicationModule {}
