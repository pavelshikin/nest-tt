import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export declare type RoleDocument = Role & Document;
export declare class Role {
    value: string;
    description: string;
    users: User[];
}
export declare const RoleSchema: mongoose.Schema<Document<Role, any>, mongoose.Model<any, any, any>, undefined>;
