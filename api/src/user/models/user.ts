import { Post } from "src/post/models/post";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({ nullable: false})
    password: string;

    @OneToMany(() => (Post), (post) => post.author)
    posts: Post[]

}