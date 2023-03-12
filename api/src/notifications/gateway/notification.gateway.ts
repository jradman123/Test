import { OnModuleInit } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'notifications'})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit{
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        console.log('initialized');
    }
    handleDisconnect(client: any) {
        console.log('disconnected');
    }
    handleConnection(client: any, ...args: any[]) {
        console.log('connected');
    }
}