import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  
  saltOrRounds: number = 10;
  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user.toObject();
      return result;
    } else {
      return null;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      userId: user._id,
      userEmail: user.email
    };
  }

  async register(registerUserDto: SignUpDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, this.saltOrRounds);

    const user = new this.userModel({
      ...registerUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async getAllServiceProviders(): Promise<User[]> {
    return this.userModel.find({ role: 'service_provider' }).exec();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({ role: 'user' }).exec();
  }
}
