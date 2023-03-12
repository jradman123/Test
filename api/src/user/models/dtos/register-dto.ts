import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
 
}