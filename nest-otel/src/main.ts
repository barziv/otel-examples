import { NestFactory } from '@nestjs/core';
import { otelSDK } from './tracing';
import { AppModule } from './app.module';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
