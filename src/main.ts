import { AppModule } from 'src/app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.runWithoutClosing(AppModule, ['log', 'warn', 'error']);
}
bootstrap();
