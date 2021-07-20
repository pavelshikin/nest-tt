import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ObjectId } from "mongoose";
import { Request } from 'express';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAll(): Promise<import("./schemas/user.schema").UserDocument[]>;
    getUser(id: ObjectId): Promise<import("./schemas/user.schema").UserDocument>;
    getMe(req: Request): Promise<{
        _id: any;
        username: string;
        roles: string[];
    }>;
    delete(id: ObjectId): Promise<{
        message: string;
    }>;
    addRole(dto: AddRoleDto): Promise<import("../roles/schemas/role.schema").RoleDocument>;
    ban(dto: BanUserDto): Promise<import("./schemas/user.schema").UserDocument>;
}
