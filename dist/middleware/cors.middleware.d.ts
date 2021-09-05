import { ExpressMiddleware, NestMiddleware } from "@nestjs/common";
export declare class CorsMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware;
}
