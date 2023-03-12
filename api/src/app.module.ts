import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database-config';
import jwtConfig from './config/jwt-config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:  (configService: ConfigService) =>({
        type: 'postgres',
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        port: +configService.get<number>('database.port'),
        host: configService.get('database.host'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UserModule
  ],
})
export class AppModule {}
