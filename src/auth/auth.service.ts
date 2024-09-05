import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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

    const payload = { username: user.name, sub: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      userId: user._id,
      userEmail: user.email,
      userName: user.name
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

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Only allow updates if the user is either a service provider or a regular user
    if (user.role === 'service_provider' || user.role === 'user') {
      Object.assign(user, updateUserDto);
      user.updatedAt = new Date(); // Update the timestamp
      return user.save();
    } else {
      throw new UnauthorizedException('You do not have permission to update this user');
    }
  }
}
