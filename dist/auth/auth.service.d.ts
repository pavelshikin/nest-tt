import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: LoginUserDto): Promise<{
        token: string;
        tokenCookie: string;
        refreshToken: string;
        refreshTokenCookie: string;
        userId: any;
    }>;
    getCookieWithJwtAccessToken(authUser: any): Promise<{
        token: string;
        tokenCookie: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
        tokenCookie: string;
        refreshToken: string;
        refreshTokenCookie: string;
        userId: any;
    }>;
    private generateToken;
    private generateRefreshToken;
    setCurrentRefreshToken(refreshToken: any, userEmail: string): Promise<void>;
    private validateUser;
    static getCookiesForLogOut(): string[];
    deleteRefreshToken(user: any): Promise<void>;
}
