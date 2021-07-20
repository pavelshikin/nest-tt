import { ObjectId } from "mongoose";
export declare class BanUserDto {
    readonly userId: ObjectId;
    readonly banReason: string;
}
