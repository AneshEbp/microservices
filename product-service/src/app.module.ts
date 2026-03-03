import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProvider } from './providers/config.provider';
import { MongooseProvider } from './providers/database.provider';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseProvider, ConfigProvider, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
