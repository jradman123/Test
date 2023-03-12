import { Body, Controller, Delete, Param, Post, Put, Request } from "@nestjs/common";
import { NotificationGateway } from "src/notifications/gateway/notification.gateway";
import { GetUser } from "src/user/decorators/get-user.decorator";
import { User } from "src/user/models/user";
import { CommentDto } from "../models/dtos/comment-dto";
import { PostDto } from "../models/dtos/post-dto";
import { PostService } from "../services/post.service";

@Controller('posts')
export class PostController {

    constructor(private postService: PostService, private notificationGateway: NotificationGateway){}

    @Post()
    createPost(@GetUser() user: User,@Body() postDto : PostDto) {
        return this.postService.createPost(user,postDto);
    }

    @Delete(':id')
    deletePost(@GetUser() user: User, @Param('id') id: number){
        return this.postService.deletePost(id,user);
    }

    @Put(':id')
    updatePost(@GetUser() user: User, @Param('id') id: number, @Body() postDto : PostDto){
        return this.postService.updatePost(id,user, postDto);
    }

    @Put('/like/:id')
    likePost(@GetUser() user: User, @Param('id') id: number){
        return this.postService.likePost(id,user);
    }

    @Put('/comment/:id')
    commentPost(@GetUser() user: User, @Param('id') id: number, @Body() commentDto: CommentDto){
        return this.postService.commentPost(id,user, commentDto);
    }
}