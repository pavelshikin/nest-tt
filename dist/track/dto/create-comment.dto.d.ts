import { ObjectId } from "mongoose";
export declare class CreateCommentDto {
    readonly trackId: ObjectId;
    readonly text: string;
}
