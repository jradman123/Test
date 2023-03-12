import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notification{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    isRead : boolean;

    @Column()
    text: string;

    @Column()
    likeId : number;

    @Column()
    commentId: number;
}