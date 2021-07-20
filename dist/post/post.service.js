"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const post_schema_1 = require("./schemas/post.schema");
const category_schema_1 = require("./schemas/category.schema");
let PostService = class PostService {
    constructor(postModel, categoryModel, usersService) {
        this.postModel = postModel;
        this.categoryModel = categoryModel;
        this.usersService = usersService;
    }
    async create(dto, user) {
        const category = await this.getCategoryById(dto.categoryId);
        const post = await this.postModel.create(Object.assign(Object.assign({}, dto), { category: category }));
        const author = await this.usersService.getUser(user._id);
        author.posts.push(post);
        await author.save();
        await post.save();
        return post;
    }
    async getAll(count = 10, offset = 0) {
        const posts = await this.postModel.find().skip(Number(offset)).limit(Number(count));
        return posts;
    }
    async getOne(id) {
        const post = await this.postModel.findById(id).populate('category');
        if (!post) {
            throw new common_1.HttpException('Пост не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return post;
    }
    async createCategory(name) {
        const category = await this.categoryModel.create(name);
        return category;
    }
    async getAllCategories() {
        const categories = await this.categoryModel.find();
        return categories;
    }
    async getCategoryById(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new common_1.HttpException('Категория не найдена', common_1.HttpStatus.NOT_FOUND);
        }
        return category;
    }
    async deletePost(id) {
        try {
            const post = await this.postModel.findByIdAndDelete(id);
            if (!post) {
                throw new common_1.HttpException(' Пост не найден', common_1.HttpStatus.NOT_FOUND);
            }
            const users = await this.usersService.getUsersByPost(post._id);
            if (!users) {
                throw new common_1.HttpException('Пользаватели не найден', common_1.HttpStatus.NOT_FOUND);
            }
            users.map(user => {
                user.posts = user.posts.filter(p => p != post.id);
                user.save();
            });
            return post._id;
        }
        catch (e) {
            console.log(e);
        }
    }
    async getPostsCategory(id) {
        await this.getCategoryById(id);
        const posts = await this.postModel.find({ category: id });
        return posts;
    }
    async getMyPosts(user) {
        const author = await this.usersService.getUser(user._id);
        let posts = [];
        for (let i = 0; i < author.posts.length; i++) {
            let post = await this.getOne(author.posts[i]);
            posts.push(post);
        }
        return posts;
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(post_schema_1.Post.name)),
    __param(1, mongoose_1.InjectModel(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map