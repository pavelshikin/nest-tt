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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const track_schema_1 = require("./schemas/track.schema");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const file_service_1 = require("../file/file.service");
const users_service_1 = require("../users/users.service");
let TrackService = class TrackService {
    constructor(trackModel, commentModel, usersService, fileService) {
        this.trackModel = trackModel;
        this.commentModel = commentModel;
        this.usersService = usersService;
        this.fileService = fileService;
    }
    async create(dto, picture, audio, user) {
        const audioPath = this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        const track = await this.trackModel.create(Object.assign(Object.assign({}, dto), { listens: 0, audio: audioPath, picture: picturePath }));
        const author = await this.usersService.getUser(user._id);
        author.tracks.push(track);
        await author.save();
        return track;
    }
    async getAll(count = 10, offset = 0) {
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks;
    }
    async getOne(id) {
        const track = await this.trackModel.findById(id).populate('comments');
        if (!track) {
            throw new common_1.HttpException('Трек не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return track;
    }
    async addTrack(trackId, user) {
        const author = await this.usersService.getUser(user._id);
        const track = await this.trackModel.findById(trackId);
        if (!track) {
            throw new common_1.HttpException('Трек не найден', common_1.HttpStatus.NOT_FOUND);
        }
        author.tracks.push(track._id);
        await author.save();
        return track;
    }
    async delete(id) {
        try {
            const track = await this.trackModel.findByIdAndDelete(id);
            if (!track) {
                throw new common_1.HttpException('Трек не найден', common_1.HttpStatus.NOT_FOUND);
            }
            const users = await this.usersService.getUsersByTrack(id);
            if (!users) {
                throw new common_1.HttpException('Пользаватели не найден', common_1.HttpStatus.NOT_FOUND);
            }
            users.map(user => {
                user.tracks = user.tracks.filter(t => t != track.id);
                user.save();
            });
            for (let i = 0; i < track.comments.length; i++) {
                this.deleteComment(track.comments[i]);
            }
            this.fileService.deleteFile(track.audio);
            this.fileService.deleteFile(track.picture);
            return track._id;
        }
        catch (e) {
            console.log(e);
        }
    }
    async addComment(dto, user) {
        const track = await this.trackModel.findById(dto.trackId);
        if (!track) {
            throw new common_1.HttpException('Трек не найден', common_1.HttpStatus.NOT_FOUND);
        }
        const author = await this.usersService.getUser(user._id);
        const username = author.username;
        const userId = author._id;
        const comment = await this.commentModel.create(Object.assign(Object.assign({}, dto), { username, userId }));
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
    async listen(id) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        await track.save();
    }
    async search(query) {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') }
        });
        return tracks;
    }
    async deleteComment(commentId) {
        try {
            const comment = await this.commentModel.findByIdAndDelete(commentId);
            if (!comment) {
                throw new common_1.HttpException('Комментарий не найден', common_1.HttpStatus.NOT_FOUND);
            }
            return comment._id;
        }
        catch (e) {
            console.log(e);
        }
    }
    async deleteCommentInTrack(commentId, trackId) {
        try {
            const id = await this.deleteComment(commentId);
            const track = await this.trackModel.findById(trackId);
            if (!track) {
                throw new common_1.HttpException('Трек не найден', common_1.HttpStatus.NOT_FOUND);
            }
            track.comments = track.comments.filter(comment => comment != id);
            await track.save();
            return { message: `Комментарий ${commentId} удален` };
        }
        catch (e) {
            console.log(e);
        }
    }
};
TrackService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(track_schema_1.Track.name)),
    __param(1, mongoose_1.InjectModel(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService,
        file_service_1.FileService])
], TrackService);
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map