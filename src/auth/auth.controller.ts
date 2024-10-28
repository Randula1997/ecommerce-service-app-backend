import { Controller, Post, Body, Get, UseGuards, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import { Roles, RolesGuard } from './guards/role.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignUpDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Auth')
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

  @Get('serviceProviders')
  @ApiBearerAuth()
  async getAllServiceProviders() {
    return this.authService.getAllServiceProviders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  @Roles('admin')
  @ApiBearerAuth()
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  @ApiBearerAuth()
  async getUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @ApiBearerAuth()
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.sendPasswordResetLink(email);
  }

  @Patch('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    return this.authService.resetPassword(token, password);
  }
}
