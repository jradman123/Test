import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationGateway } from './gateway/notification.gateway';
import { Notification } from './models/notification';
import { NotificationService } from './services/notification.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Notification])
    ],
    providers: [NotificationGateway,NotificationService],
    exports: [NotificationGateway]
})
export class NotificationsModule {}
