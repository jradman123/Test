import { IsNotEmpty } from "class-validator";

export class PostDto{
    @IsNotEmpty()
    text: string;
}