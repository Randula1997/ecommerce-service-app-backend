import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
