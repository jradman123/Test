import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../models/dtos/register-dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    registerUser(@Body() registerDto : RegisterDto) {
        return this.userService.registerUser(registerDto);
    }
}
