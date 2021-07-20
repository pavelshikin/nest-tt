import { Date, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from "./category.schema";
export declare type PostDocument = Post & Document;
export declare class Post {
    title: string;
    content: string;
    created: Date;
    category: Category[];
}
export declare const PostSchema: mongoose.Schema<Document<Post, any>, mongoose.Model<any, any, any>, undefined>;
