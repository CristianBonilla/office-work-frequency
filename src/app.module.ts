import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, ENV_FILE_PATH } from 'src/config';
import { ApplicationModule } from '@application/application.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ENV_FILE_PATH, load: [CONFIGURATION] }), ApplicationModule],
  controllers: [],
  providers: []
})
export class AppModule {}
