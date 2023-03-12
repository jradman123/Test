import { User } from "src/user/models/user";
import { Socket } from 'socket.io';

export type UserPayload = {
    user : User;
}
export type SocketWithAuth = Socket & UserPayload;