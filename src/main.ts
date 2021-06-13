import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
