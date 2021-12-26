import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, ENV_FILE_PATH } from './config';
import { ApplicationModule } from '@application/application.module';
import { ProvidersModule } from '@providers/providers.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ENV_FILE_PATH, load: [CONFIGURATION] }), ApplicationModule, ProvidersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
