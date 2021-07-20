import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
import { Post } from '../../post/schemas/post.schema';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    username: string;
    banned: boolean;
    banReason: string;
    currentHashedRefreshToken?: string;
    roles: string[];
    tracks: Track[];
    posts: Post[];
}
export declare const UserSchema: mongoose.Schema<Document<User, any>, mongoose.Model<any, any, any>, undefined>;
