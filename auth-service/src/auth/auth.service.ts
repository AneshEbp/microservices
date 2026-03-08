import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/models/auth.model';
import * as bcrypt from 'bcrypt';
import { JwtWrapperService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private readonly jwtService: JwtWrapperService,
  ) {}

  async register(email: string, password: string) {
    try {
      // Check if user already exists
      const existingUser = await this.authModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = new this.authModel({
        email,
        password: hashedPassword,
      });

      await user.save();

      // Generate JWT
      const payload = { id: user._id, email: user.email };
      const token = this.jwtService.sign(payload);

      return { user: { id: user._id, email: user.email }, token };
    } catch (error) {
      console.error('Register service error:', error);
      throw error;
    }
  }

  // Login user
  async login(email: string, password: string) {
    try {
      // Find user
      const user = await this.authModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT
      const payload = { id: user._id, email: user.email };
      const token = this.jwtService.sign(payload);

      return { user: { id: user._id, email: user.email }, token };
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  }
}
