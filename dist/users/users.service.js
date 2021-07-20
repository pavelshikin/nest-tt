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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const roles_service_1 = require("../roles/roles.service");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(userModel, roleService) {
        this.userModel = userModel;
        this.roleService = roleService;
    }
    async createUser(dto) {
        const user = await this.userModel.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        if (role && user) {
            user.roles.push(role.value);
            role.users.push(user._id);
            await user.save();
            await role.save();
            return user;
        }
        throw new common_1.HttpException('Роль не найдена', common_1.HttpStatus.NOT_FOUND);
    }
    async updateRefreshToken(userId, refreshToken) {
        const token = await bcrypt.hash(refreshToken, 10);
        await this.userModel.findByIdAndUpdate(userId, {
            currentHashedRefreshToken: token
        }, { new: true, useFindAndModify: false });
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        const user = await this.getUser(userId);
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async removeRefreshToken(userId) {
        return this.userModel.findByIdAndUpdate(userId, {
            currentHashedRefreshToken: null
        }, { new: true, useFindAndModify: false });
    }
    async getAllUsers() {
        const users = await this.userModel.find();
        return users;
    }
    async getUser(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async getMe(user) {
        const me = await this.userModel.findById(user._id);
        return {
            _id: me._id,
            username: me.username,
            roles: me.roles
        };
    }
    async deleteUser(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Пользователь удален' };
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        return user;
    }
    async getUsersByTrack(trackId) {
        const users = await this.userModel.find({ tracks: trackId });
        return users;
    }
    async getUsersByPost(id) {
        const users = await this.userModel.find({ posts: id });
        return users;
    }
    async addRole(dto) {
        const user = await this.userModel.findById(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            user.roles.push(role.value);
            role.users.push(user._id);
            await user.save();
            await role.save();
            return role;
        }
        throw new common_1.HttpException('Пользователь или роль не найдены', common_1.HttpStatus.NOT_FOUND);
    }
    async ban(dto) {
        const user = await this.userModel.findById(dto.userId);
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден', common_1.HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map