import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { DomainModule } from '@domain/domain.module';
import { TypeQuestions } from '@application/questions/type.question';
import { CustomDatasetQuestion } from '@application/questions/custom-dataset.question';
import { FrequencyRunner } from '@application/commands/frequency.command';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';
import { CalculateFrequencyService } from '@application/services/calculate-frequency/calculate-frequency.service';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [TypeQuestions, CustomDatasetQuestion, FrequencyRunner, ReadDatasetService, CalculateFrequencyService]
})
export class ApplicationModule {}
