import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Module({
    imports: [
        JwtModule.registerAsync({
         imports: [ ConfigModule ], 
         inject: [ConfigService],
         useFactory: (configService : ConfigService) => ({
            secret: configService.get('token.jwt_secret'),
            signOptions: { expiresIn: configService.get('token.expires_in')}
         }),
        }),
        TypeOrmModule.forFeature([User])
],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {

}
