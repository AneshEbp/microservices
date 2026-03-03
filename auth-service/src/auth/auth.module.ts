import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/models/auth.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtWrapperService } from 'src/jwt/jwt.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY', // Replace with env variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtWrapperService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
