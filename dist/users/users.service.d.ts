import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from "mongoose";
export declare class UsersService {
    private userModel;
    private roleService;
    constructor(userModel: Model<UserDocument>, roleService: RolesService);
    createUser(dto: CreateUserDto): Promise<UserDocument>;
    updateRefreshToken(userId: ObjectId, refreshToken: any): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: ObjectId): Promise<UserDocument>;
    removeRefreshToken(userId: ObjectId): Promise<UserDocument>;
    getAllUsers(): Promise<UserDocument[]>;
    getUser(id: ObjectId): Promise<UserDocument>;
    getMe(user: any): Promise<{
        _id: any;
        username: string;
        roles: string[];
    }>;
    deleteUser(id: ObjectId): Promise<{
        message: string;
    }>;
    getUserByEmail(email: string): Promise<UserDocument>;
    getUsersByTrack(trackId: any): Promise<UserDocument[]>;
    getUsersByPost(id: any): Promise<UserDocument[]>;
    addRole(dto: AddRoleDto): Promise<import("../roles/schemas/role.schema").RoleDocument>;
    ban(dto: BanUserDto): Promise<UserDocument>;
}
