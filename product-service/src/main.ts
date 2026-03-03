import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4001, // microservice port
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
  console.log('Product Microservice running on TCP port 4001');
}
bootstrap();
