import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseProvider } from './providers/database.provider';
import { ConfigProvider } from './providers/config.provider';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseProvider, ConfigProvider, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
