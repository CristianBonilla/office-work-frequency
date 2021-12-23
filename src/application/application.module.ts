import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { DomainModule } from '@domain/domain.module';

import { TypeQuestion } from '@application/questions/type.question';
import { CustomDatasetQuestion } from '@application/questions/custom-dataset.question';
import { TryAgainQuestion } from '@application/questions/try-again.question';
import { FrequencyRunner } from '@application/commands/frequency.command';
import { ReadDatasetService } from '@application/services/read-dataset/read-dataset.service';
import { FrequencyService } from '@application/services/frequency/frequency.service';

@Module({
  imports: [ProvidersModule, InfrastructureModule, DomainModule],
  providers: [TypeQuestion, CustomDatasetQuestion, TryAgainQuestion, FrequencyRunner, ReadDatasetService, FrequencyService]
})
export class ApplicationModule {}
