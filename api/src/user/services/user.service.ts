import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import { RegisterDto } from "../models/dtos/register-dto";
import { User } from "../models/user";
import * as argon2 from "argon2";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async registerUser(registerDto : RegisterDto) : Promise<User>{
        const user = plainToClass(User,{
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
            password: await argon2.hash(registerDto.password)
        })
        await this.checkIfEmailExists(user);
        let savedUser = await this.userRepository.save(user);
        delete savedUser.password;
        return savedUser;
    }

    async checkIfEmailExists(user : User)  {
        const userEmail = await this.userRepository.findOne({
            where : {email : user.email}
        })
        if(userEmail){
            throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: 'Email already exists!!' },
                HttpStatus.BAD_REQUEST,
              );
        }
        
        
    }
}