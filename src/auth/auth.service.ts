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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const token = this.jwtService.sign({ id: user.id});

        return  { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email })

        if(!user) {
            throw new UnauthorizedException('Invalid email or Password')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({ id: user._id});

        return { token }
    }
}
