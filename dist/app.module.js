"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const track_module_1 = require("./track/track.module");
const mongoose_1 = require("@nestjs/mongoose");
const file_module_1 = require("./file/file.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const jwt_refresh_token_strategy_1 = require("./auth/jwt-refresh-token.strategy");
const passport_1 = require("@nestjs/passport");
const post_module_1 = require("./post/post.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
            mongoose_1.MongooseModule.forRoot((process.env.MONGODB_STORE_URI ||
                'mongodb+srv://admin:eE6gvSCDFnXhyv7S@cluster0.enp62.mongodb.net/music-platform?retryWrites=true&w=majority')),
            track_module_1.TrackModule,
            post_module_1.PostModule,
            file_module_1.FileModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            passport_1.PassportModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [jwt_refresh_token_strategy_1.JwtRefreshTokenStrategy]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map