import { INestApplicationContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from 'socket.io';
import { SocketWithAuth } from "../models/types";

export class CustomAdapter extends IoAdapter{
    constructor(
        private app: INestApplicationContext
      ) {
        super(app);
      }

      createIOServer(port: number) {
        const jwtService = this.app.get(JwtService);
        const server: Server = super.createIOServer(port);
    
        server.of('notifications').use(createTokenMiddleware(jwtService));
    
        return server;
      }
}

const createTokenMiddleware =
  (jwtService: JwtService) =>
  (socket: SocketWithAuth, next) => {
    // for Postman testing support, fallback to token header
    const token =
      socket.handshake.auth.token || socket.handshake.headers.authorization;


    try {
      const payload = jwtService.verify(token);
      socket.user = payload;
      next();
    } catch {
      next(new Error('FORBIDDEN'));
    }
  };
