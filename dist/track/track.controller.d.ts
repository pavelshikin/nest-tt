import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Request } from 'express';
import RequestWithUser from '../auth/requestWithUser.interface';
export declare class TrackController {
    private trackService;
    constructor(trackService: TrackService);
    create(files: any, dto: CreateTrackDto, req: RequestWithUser): Promise<import("./schemas/track.schema").Track>;
    getAll(count: number, offset: number): Promise<import("./schemas/track.schema").Track[]>;
    search(query: string): Promise<import("./schemas/track.schema").Track[]>;
    getOne(id: ObjectId): Promise<import("./schemas/track.schema").Track>;
    addTrack(trackId: ObjectId, req: Request): Promise<import("./schemas/track.schema").Track>;
    delete(id: ObjectId): Promise<import("mongoose").Schema.Types.ObjectId>;
    addComment(dto: CreateCommentDto, req: RequestWithUser): Promise<import("./schemas/comment.schema").Comment>;
    listen(id: ObjectId): Promise<void>;
    deleteComment(commentId: ObjectId, trackId: ObjectId): Promise<{
        message: string;
    }>;
}
