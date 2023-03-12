import { OnModuleInit } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { Notification } from "../models/notification";
import { SocketWithAuth } from "../models/types";
import { NotificationService } from "../services/notification.service";

@WebSocketGateway({ namespace: 'notifications'})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit{
    constructor(private notificationService : NotificationService){

    }
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        console.log('initialized');
    }
    handleDisconnect(client: SocketWithAuth) {
        console.log('disconnected');
    }
    handleConnection(client: SocketWithAuth) {
        console.log('connected');
    }

    @SubscribeMessage('createNotification')
    createNotification(socket: SocketWithAuth, notification: Notification) {
       this.notificationService.createNotification(notification);
    }
}