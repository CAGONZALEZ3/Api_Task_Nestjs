import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Filtra las propiedades no permitidas
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no permitidas
    transform: true, // Convierte automáticamente los objetos a instancias de clases
    disableErrorMessages: false, // Habilita los mensajes de error (si es necesario)
  }));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(process.env.PORT ?? 3000);

  console.log(`This application is runnning on: ${await app.getUrl()}/api/v1`);  
}
bootstrap();
