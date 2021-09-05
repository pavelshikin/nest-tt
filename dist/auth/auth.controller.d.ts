import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Request } from "express";
import RequestWithUser from "./requestWithUser.interface";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto, request: Request): Promise<{
        Authentication: string;
        Refresh: string;
        userId: any;
    }>;
    registration(userDto: CreateUserDto, request: Request): Promise<{
        Authentication: string;
        Refresh: string;
        userId: any;
    }>;
    refresh(request: any): Promise<string>;
    logOut(request: RequestWithUser): Promise<void>;
}
