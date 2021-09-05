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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const jwt_refresh_quard_1 = require("./jwt-refresh.quard");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(userDto, request) {
        const { token, tokenCookie, refreshToken, refreshTokenCookie, userId } = await this.authService.login(userDto);
        await this.authService.setCurrentRefreshToken(refreshToken, userDto.email);
        request.res.setHeader("Set-Cookie", [tokenCookie, refreshTokenCookie]);
        return { Authentication: token, Refresh: refreshToken, userId };
    }
    async registration(userDto, request) {
        const { token, tokenCookie, refreshToken, refreshTokenCookie, userId } = await this.authService.registration(userDto);
        await this.authService.setCurrentRefreshToken(refreshToken, userDto.email);
        request.res.setHeader("Set-Cookie", [tokenCookie, refreshTokenCookie,]);
        return { Authentication: token, Refresh: refreshToken, userId };
    }
    async refresh(request) {
        const { token, tokenCookie } = await this.authService.getCookieWithJwtAccessToken(request.user);
        request.res.setHeader("Set-Cookie", tokenCookie);
        return token;
    }
    async logOut(request) {
        await this.authService.deleteRefreshToken(request.user);
        request.res.setHeader("Set-Cookie", auth_service_1.AuthService.getCookiesForLogOut());
    }
};
__decorate([
    common_1.HttpCode(200),
    common_1.Post("/login"),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post("/registration"),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    common_1.UseGuards(jwt_refresh_quard_1.default),
    common_1.Get("/refresh"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post("/logout"),
    common_1.HttpCode(200),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
AuthController = __decorate([
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map