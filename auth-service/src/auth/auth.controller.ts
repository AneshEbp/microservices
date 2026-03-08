import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register_user' })
  async register(@Payload() data: { email: string; password: string }) {
    try {
      return await this.authService.register(data.email, data.password);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'login_user' })
  async login(@Payload() data: { email: string; password: string }) {
    try {
      return await this.authService.login(data.email, data.password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
