import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { MongooseProvider } from './providers/database.provider';
import { ConfigProvider } from './providers/config.provider';

@Module({
  imports: [OrderModule, MongooseProvider, ConfigProvider],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
