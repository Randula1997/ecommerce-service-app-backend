/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
    constructor(private authService: AuthService){}
   
    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }>{
        return this.authService.signUp(signUpDto);
    }
   
    @Post('login')
    @UseGuards(localGuard)
    login(@Body() loginDto: LoginDto): Promise<{ token: string}>{
        return this.authService.login(loginDto);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        console.log("Inside AuthController status method")
        return req.user
    }
}
