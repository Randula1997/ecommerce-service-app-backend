/* eslint-disable prettier/prettier */
import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength, MinLength,  } from "@nestjs/class-validator"
import { Role } from "../schemas/user.schema";

export class SignUpDto{
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    readonly name: string;

    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsEmail({}, { message: 'Please enter a correct email address' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(12, { message: 'Password must be at most 12 characters long' })
    readonly password: string;

    @IsNotEmpty({ message: 'Role must not be empty' })
    @IsString({ message: 'Role must be a string' })
    @IsIn([Role.User, Role.Store], { message: 'Role must be either "user" or "store"' })
    readonly role: string;
}