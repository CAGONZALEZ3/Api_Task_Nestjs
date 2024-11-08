import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')

  await app.listen(process.env.PORT ?? 3000);

  console.log(`This application is runnning on: ${await app.getUrl()}/api/v1`);  
}
bootstrap();
