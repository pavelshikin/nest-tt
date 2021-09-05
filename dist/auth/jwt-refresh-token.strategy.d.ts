import { UsersService } from "src/users/users.service";
import { Request } from "express";
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private userService;
    constructor(userService: UsersService);
    validate(request: Request, { _id }: {
        _id: any;
    }): Promise<import("../users/schemas/user.schema").UserDocument>;
}
export {};
