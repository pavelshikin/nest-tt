import { Model, ObjectId } from "mongoose";
import { UsersService } from '../users/users.service';
import { Post, PostDocument } from './schemas/post.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostService {
    private postModel;
    private categoryModel;
    private usersService;
    constructor(postModel: Model<PostDocument>, categoryModel: Model<CategoryDocument>, usersService: UsersService);
    create(dto: CreatePostDto, user: any): Promise<Post>;
    getAll(count?: number, offset?: number): Promise<Post[]>;
    getOne(id: any): Promise<Post>;
    createCategory(name: string): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: any): Promise<Category>;
    deletePost(id: ObjectId): Promise<any>;
    getPostsCategory(id: any): Promise<PostDocument[]>;
    getMyPosts(user: any): Promise<any[]>;
}
