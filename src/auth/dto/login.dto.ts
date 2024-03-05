/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator"

export class LoginDto{

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a correct email address"})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string

}