import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "../models/notification";

@Injectable()
export class NotificationService {
  
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository : Repository<Notification>
    ){}

    createNotification(notification: Notification) {
        this.notificationRepository.save(notification);
    }


}