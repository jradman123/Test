import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";

@Entity('likes')
export class Like{
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    creatorId : number;

    @ManyToOne(() => (Post), (post) => post.likes)
    post: Post;

}