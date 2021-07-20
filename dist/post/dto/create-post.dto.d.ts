import { ObjectId } from 'mongoose';
export declare class CreatePostDto {
    readonly title: string;
    readonly content?: string;
    readonly categoryId: ObjectId;
}
