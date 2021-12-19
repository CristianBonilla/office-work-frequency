import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error']
  });
  const config = app.get(ConfigService);
  await app.listen(config.get('port') || 8001);
}
bootstrap();
