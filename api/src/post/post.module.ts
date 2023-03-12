import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { Comment } from './models/comment';
import { Like } from './models/like';
import { Post } from './models/post';
import { PostService } from './services/post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, Like, Comment])
    ],
    providers: [PostService],
    controllers: [PostController]
})
export class PostModule {}
