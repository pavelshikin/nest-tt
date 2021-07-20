import { Document } from 'mongoose';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    name: string;
}
export declare const CategorySchema: import("mongoose").Schema<Document<Category, any>, import("mongoose").Model<any, any, any>, undefined>;
