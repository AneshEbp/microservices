import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtWrapperService {
  constructor(private readonly jwtService: NestJwtService) {}

  // Sign a payload and return a token
  sign(payload: Record<string, any>, expiresIn = '1h'): string {
    // const options: JwtSignOptions = { expiresIn: 3600 };
    return this.jwtService.sign(payload);
  }

  // Verify a token, type T must extend object
  verify<T extends object = any>(token: string): T {
    return this.jwtService.verify<T>(token);
  }

  // Decode token without verification
  decode<T extends object = any>(token: string): T | null {
    return this.jwtService.decode(token) as T | null;
  }
}
