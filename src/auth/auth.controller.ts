import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import { Roles, RolesGuard } from './guards/role.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: SignUpDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('serviceProviders')
  @Roles('admin')
  async getAllServiceProviders() {
    return this.authService.getAllServiceProviders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  @Roles('admin')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
