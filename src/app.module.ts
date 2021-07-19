import {Module} from "@nestjs/common"
import {TrackModule} from "./track/track.module"
import {MongooseModule} from "@nestjs/mongoose"
import {FileModule} from "./file/file.module"
import {ServeStaticModule} from "@nestjs/serve-static"
import * as path from "path"
import {AuthModule} from "./auth/auth.module"
import {UsersModule} from "./users/users.module"
import {RolesModule} from "./roles/roles.module"
import {JwtRefreshTokenStrategy} from "./auth/jwt-refresh-token.strategy"
import {PassportModule} from "@nestjs/passport"
import {PostModule} from './post/post.module'
import { AppController } from "./app.controller"


@Module({
   imports: [
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
      MongooseModule.forRoot((
        process.env.MONGODB_STORE_URI ||
        'mongodb+srv://admin:eE6gvSCDFnXhyv7S@cluster0.enp62.mongodb.net/music-platform?retryWrites=true&w=majority')),
      TrackModule,
      PostModule,
      FileModule,
      AuthModule,
      UsersModule,
      RolesModule,
      PassportModule
   ],
   controllers: [AppController],
   providers: [JwtRefreshTokenStrategy]
})
export class AppModule {
}