"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        const { token, tokenCookie } = await this.generateToken(user);
        const { refreshToken, refreshTokenCookie } = await this.generateRefreshToken(user);
        return { token, tokenCookie, refreshToken, refreshTokenCookie, userId: user._id };
    }
    async getCookieWithJwtAccessToken(authUser) {
        const user = await this.userService.getUser(authUser._id);
        const { token, tokenCookie } = await this.generateToken(user);
        return { token, tokenCookie };
    }
    async registration(userDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException("Пользователь с таким email существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser(Object.assign(Object.assign({}, userDto), { password: hashPassword }));
        const { token, tokenCookie } = await this.generateToken(user);
        const { refreshToken, refreshTokenCookie } = await this.generateRefreshToken(user);
        return { token, tokenCookie, refreshToken, refreshTokenCookie, userId: user._id };
    }
    async generateToken(user) {
        const payload = { email: user.email, _id: user._id, roles: user.roles };
        const token = await this.jwtService.sign(payload);
        return {
            token: token,
            tokenCookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`
        };
    }
    async generateRefreshToken(user) {
        const payload = { email: user.email, _id: user._id, roles: user.roles };
        const token = await this.jwtService.sign(payload, {
            secret: process.env.REFRESH_PRIVATE_KEY || "REFRESH_SECRET_KEY"
        });
        return {
            refreshToken: token,
            refreshTokenCookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`
        };
    }
    async setCurrentRefreshToken(refreshToken, userEmail) {
        const user = await this.userService.getUserByEmail(userEmail);
        await this.userService.updateRefreshToken(user._id, refreshToken);
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException({ message: "Неверный email или пароль" });
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({ message: "Неверный email или пароль" });
    }
    static getCookiesForLogOut() {
        return [
            "Authentication=; HttpOnly; Path=/; Max-Age=0",
            "Refresh=; HttpOnly; Path=/; Max-Age=0",
            "token=;  ; Path=/; Max-Age=0"
        ];
    }
    async deleteRefreshToken(user) {
        await this.userService.removeRefreshToken(user._id);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map