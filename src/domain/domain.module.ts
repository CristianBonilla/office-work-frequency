import { Module } from '@nestjs/common';
import { DATASET_OPERATIONS_PROVIDER } from '@domain/providers/dataset.provider';

@Module({
  providers: [DATASET_OPERATIONS_PROVIDER]
})
export class DomainModule {}
