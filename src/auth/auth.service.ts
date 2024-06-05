/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ServiceProvider } from './schemas/serviceProvider.schema';

const fakeUsers = [
    {
        id: 1,
        username: 'adam',
        password: 'password'
    },
    {
        id: 2,
        username: 'jack',
        password: 'password123'
    }
]

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        @InjectModel(ServiceProvider.name) 
        private serviceProviderModel: Model<ServiceProvider>,
        private jwtService: JwtService 
    ) {}

    validateUser({ username, password }: AuthPayloadDto) {
        const findUser = fakeUsers.find((user) => user.username === username);
        if (!findUser) return null;
        if (password === findUser.password) {
            const { password, ...user } = findUser;
            return this.jwtService.sign(user)
        }
    }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string}> {
        const { name, email, password, role } = signUpDto;  
        let user;
        try {
            const existingService = await this.serviceProviderModel.findOne({ email });
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser || existingService) {
                throw new Error('Email is already registered');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            
            if (role === 'user') {
              user = await this.userModel.create({ name, email, password: hashedPassword });
            } else if (role === 'serviceProvider') {
              user = await this.serviceProviderModel.create({ name, email, password: hashedPassword });
            } else {
              throw new Error('Invalid role');
            }
      
            const token = this.jwtService.sign({ id: user.id });
            return { token };
          } catch (error) {
            // Handle specific errors
            if (error.message.includes('duplicate key error')) {
                throw new Error('Email is already registered');
            }
            
            throw new Error('Error creating user');
          }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        // Find user in both UserModel and ServiceProviderModel
        const user = await Promise.any([
        this.userModel.findOne({ email }).exec(),
        this.serviceProviderModel.findOne({ email }).exec(),
        ]).catch(() => null);

        if (!user) {
        throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
        }
}
