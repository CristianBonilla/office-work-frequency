import { Module } from '@nestjs/common';
import { TABLE_PROVIDER } from '@providers/table.provider';

@Module({
  providers: [TABLE_PROVIDER],
  exports: [TABLE_PROVIDER]
})
export class ProvidersModule {}
