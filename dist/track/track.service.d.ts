import { Track, TrackDocument } from "./schemas/track.schema";
import { Model, ObjectId } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService } from "../file/file.service";
import { UsersService } from '../users/users.service';
export declare class TrackService {
    private trackModel;
    private commentModel;
    private usersService;
    private fileService;
    constructor(trackModel: Model<TrackDocument>, commentModel: Model<CommentDocument>, usersService: UsersService, fileService: FileService);
    create(dto: CreateTrackDto, picture: any, audio: any, user: any): Promise<Track>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    addTrack(trackId: ObjectId, user: any): Promise<Track>;
    delete(id: ObjectId): Promise<ObjectId>;
    addComment(dto: CreateCommentDto, user: any): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
    search(query: string): Promise<Track[]>;
    private deleteComment;
    deleteCommentInTrack(commentId: ObjectId, trackId: any): Promise<{
        message: string;
    }>;
}
