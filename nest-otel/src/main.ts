import { NestFactory } from '@nestjs/core';
import { opentelemetrySDK } from './tracing';
import { AppModule } from './app.module';

async function bootstrap() {
  opentelemetrySDK.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
