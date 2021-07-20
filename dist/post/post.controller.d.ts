import { PostService } from "./post.service";
import { ObjectId } from "mongoose";
import { Request } from 'express';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    create(dto: CreatePostDto, req: RequestWithUser): Promise<import("./schemas/post.schema").Post>;
    getAll(count: number, offset: number): Promise<import("./schemas/post.schema").Post[]>;
    getMyPosts(req: Request): Promise<any[]>;
    createCategory(name: string): Promise<import("./schemas/category.schema").Category>;
    delete(id: ObjectId): Promise<any>;
    getPostsCategory(id: ObjectId): Promise<import("./schemas/post.schema").PostDocument[]>;
}
