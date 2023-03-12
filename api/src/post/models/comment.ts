import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    creatorId : number;

    @Column()
    text: string;

    @ManyToOne(() => (Post), (post) => post.comments)
    post: Post;

}