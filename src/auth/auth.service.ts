import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject(); // Make sure to include the role
      return result;
    }
    return null;
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
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = new this.userModel(registerUserDto);
    user.password = await bcrypt.hash(user.password, 10); // Hash the password before saving
    return user.save();
  }

  async getAllServiceProviders(): Promise<User[]> {
    return this.userModel.find({ role: 'service_provider' }).exec();
  }

  async getAllUsers(): Promise<User[]>{
    return this.userModel.find({ role: 'user'}).exec();
  }

}
