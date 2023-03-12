import { User } from "src/user/models/user";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment";
import { Like } from "./like";

@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default : ''})
    text: string;

    @ManyToOne(()=> User, (user) => user.posts)
    author: User;
    
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => (Like), (like) => like.post)
    likes: Like[]

    @OneToMany(() => (Comment), (comment) => comment.post)
    comments: Comment[];

}