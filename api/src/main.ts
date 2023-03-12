import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomAdapter } from './notifications/gateway/custom-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }
  ));
  app.useWebSocketAdapter(new CustomAdapter(app))
  await app.listen(3000);
}
bootstrap();
