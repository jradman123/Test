import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../models/dtos/login-dto";
import { RegisterDto } from "../models/dtos/register-dto";
import { UserService } from "../services/user.service";

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService){}

    @Post('/register')
    registerUser(@Body() registerDto : RegisterDto) {
        return this.userService.registerUser(registerDto);
    }

    @Post('/login')
    login(@Body() loginDto : LoginDto)   {
        return this.userService.login(loginDto);
    }
}
