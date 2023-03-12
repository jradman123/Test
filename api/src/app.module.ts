import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database-config';
import jwtConfig from './config/jwt-config';
import { PostModule } from './post/post.module';
import { JwtGuard } from './user/guards/jwt.guard';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';

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
    UserModule,
    PostModule,
    NotificationsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ]
})
export class AppModule {}
