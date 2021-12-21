import { Module } from '@nestjs/common';
import { DatasetOperationsFacade } from '@domain/dataset/dataset-operations.facade';

@Module({
  providers: [DatasetOperationsFacade],
  exports: [DatasetOperationsFacade]
})
export class DomainModule {}
