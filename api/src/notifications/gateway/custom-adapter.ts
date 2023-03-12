import { INestApplicationContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from 'socket.io';
import { UserService } from "src/user/services/user.service";
import { SocketWithAuth } from "../models/types";

export class CustomAdapter extends IoAdapter{
    constructor(
        private app: INestApplicationContext
      ) {
        super(app);
      }

      createIOServer(port: number) {
        const userService = this.app.get(UserService);
        const server: Server = super.createIOServer(port);
    
        server.of('notifications').use(createTokenMiddleware(userService));
    
        return server;
      }
}

const createTokenMiddleware =
  (userService: UserService) =>
  async (socket: SocketWithAuth, next) => {
    const token =
      socket.handshake.auth.token || socket.handshake.headers.authorization;
    try {
      const payload = await userService.getJwtUser(token);
      socket.user=payload;
      next();
    } catch {
      next(new Error('FORBIDDEN'));
    }
  };
