import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "../decorators/public.decorator";
import { LoginDto } from "../models/dtos/login-dto";
import { RegisterDto } from "../models/dtos/register-dto";
import { UserService } from "../services/user.service";

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService){}

    @Public()
    @Post('/register')
    registerUser(@Body() registerDto : RegisterDto) {
        return this.userService.registerUser(registerDto);
    }

    @Public()
    @Post('/login')
    login(@Body() loginDto : LoginDto)   {
        return this.userService.login(loginDto);
    }
}
