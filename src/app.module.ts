import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, ENV_FILE_PATH } from 'src/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ENV_FILE_PATH, load: [CONFIGURATION] })],
  controllers: [],
  providers: []
})
export class AppModule {}
