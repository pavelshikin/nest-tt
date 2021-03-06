import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Request } from "express";
import JwtRefreshGuard from "./jwt-refresh.quard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import RequestWithUser from "./requestWithUser.interface";


@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(200)
  @Post("/login")
  async login(@Body() userDto: CreateUserDto,
              @Req() request: Request) {
    const { token, tokenCookie, refreshToken, refreshTokenCookie, userId } = await this.authService.login(userDto);
    await this.authService.setCurrentRefreshToken(refreshToken, userDto.email);
    request.res.setHeader("Set-Cookie", [tokenCookie, refreshTokenCookie]);
    return { Authentication: token, Refresh: refreshToken, userId };
  }

  @Post("/registration")
  async registration(@Body() userDto: CreateUserDto,
                     @Req() request: Request) {
    const { token, tokenCookie, refreshToken, refreshTokenCookie, userId } = await this.authService.registration(userDto);
    await this.authService.setCurrentRefreshToken(refreshToken, userDto.email);
    request.res.setHeader("Set-Cookie", [tokenCookie, refreshTokenCookie, ]);
    return { Authentication: token, Refresh: refreshToken, userId };
  }

  @UseGuards(JwtRefreshGuard)
  @Get("/refresh")
  async refresh(@Req() request) {
    const { token, tokenCookie } = await this.authService.getCookieWithJwtAccessToken(request.user);
    request.res.setHeader("Set-Cookie", tokenCookie);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Post("/logout")
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.authService.deleteRefreshToken(request.user);
    request.res.setHeader("Set-Cookie", AuthService.getCookiesForLogOut());
  }
}
