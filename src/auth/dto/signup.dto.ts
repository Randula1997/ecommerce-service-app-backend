/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schemas/user.schema';


export class SignUpDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Please enter a correct email address' })
  readonly email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user',
  })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8)
  @MaxLength(12)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,12}$/, {
    message:
      'Password must be 8-12 characters long, include at least one lowercase letter, one uppercase letter, and one number.',
  })
  readonly password: string;

  @ApiProperty({
    example: UserRole.USER,
    description: 'The role of the user',
    enum: UserRole,
  })
  @IsNotEmpty({ message: 'Role must not be empty' })
  @IsString({ message: 'Role must be a string' })
  @IsIn([UserRole.USER, UserRole.SERVICE_PROVIDER, UserRole.ADMIN], {
    message: 'Role must be either "user" , "service provider" or "admin"',
  })
  readonly role: string;
}
