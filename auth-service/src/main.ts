import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: true, // Allow all origins
  //   credentials: true,
  // });
  // await app.listen(process.env.PORT ?? 3010);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4000,
      },
    },
  );
  await app.listen();
  console.log('Product microservice is running on TCP 4000');
}
bootstrap();
