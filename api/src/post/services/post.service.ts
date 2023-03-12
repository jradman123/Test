import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { User } from "src/user/models/user";
import { Repository } from "typeorm";
import { Comment } from "../models/comment";
import { CommentDto } from "../models/dtos/comment-dto";
import { PostDto } from "../models/dtos/post-dto";
import { Like } from "../models/like";
import { Post } from "../models/post";

@Injectable()
export class PostService{

    constructor(
        @InjectRepository(Post)
        private readonly postRepository : Repository<Post>,
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    async createPost(user: User, postDto: PostDto) : Promise<Post>{
        const post = plainToClass(Post, {
            text: postDto.text,
            author: user
        })
        return await this.postRepository.save(post);
    }


    async findById(id : number) : Promise<Post>{
        return await this.postRepository.findOne({
            where : { id: id},
            relations: ['author']
        })
    }

    async deletePost(id: number, user: User){
        const post = await this.findById(id);
        console.log(user)
        if(post.author.id === user.id){
            return await this.postRepository.delete({id});
        }else {
            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: 'You are not owner of this post!!' },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    async updatePost(id: number, user: User, postDto: PostDto){
        let postForUpdate = plainToClass(Post,{
            text: postDto.text
        })
        const post = await this.findById(id);
        console.log(user)
        if(post.author.id === user.id){
            return await this.postRepository.update({id}, postForUpdate);
        }else {
            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: 'You are not owner of this post!!' },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    async likePost(id: number, user: User) {
        const post = await this.findById(id);
        let like = plainToClass(Like, {
            creatorId: user.id,
            post: post
        })
        return await this.likeRepository.save(like)
    }

    async commentPost(id: number, user: User, commentDto: CommentDto) {
        const post = await this.findById(id);
        let comment = plainToClass(Comment, {
            creatorId: user.id,
            post: post,
            text: commentDto.text
        })
        return await this.commentRepository.save(comment)
    }





}