import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import { RegisterDto } from "../models/dtos/register-dto";
import { User } from "../models/user";
import * as argon2 from "argon2";
import { LoginDto } from "../models/dtos/login-dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService : JwtService
    ){}

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where : {email : email}
        });
      }

      async findById(id: number) {
        return await this.userRepository.findOne({
            where : {id : id}
        });
      }

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

    async login(loginDto : LoginDto) {
      const user = await this.validateUser(loginDto);
      if(user){
        let token = await this.jwtService.signAsync({user});
        return token;
      }

    }

    async validateUser(loginDto : LoginDto) : Promise<User> {
        const user = await this.userRepository.findOne({
            where : {email : loginDto.email}
        })
        if(user){
            let pwMatches = await argon2.verify(user.password, loginDto.password)
            if(!pwMatches){
                throw new HttpException(
                    { 
                        status: HttpStatus.BAD_REQUEST,
                        error: 'Invalid password!' 
                    },
                        HttpStatus.BAD_REQUEST,
                    );
            }
            return user;
        }else{
            throw new HttpException(
            { 
                status: HttpStatus.BAD_REQUEST,
                error: 'User does not exist!' 
            },
                HttpStatus.BAD_REQUEST,
            );
           }
    }
}