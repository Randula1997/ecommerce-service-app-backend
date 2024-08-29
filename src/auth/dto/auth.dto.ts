import { IsString, IsEmail, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
