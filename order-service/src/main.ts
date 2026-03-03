import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  const app= await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options:{
       host: '127.0.0.1',
        port: 4002,
    }
  })

   app.useGlobalPipes(new ValidationPipe());

  await app.listen();
  console.log('Product Microservice running on TCP port 4002');
}
bootstrap();
