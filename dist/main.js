"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const validation_pipe_1 = require("./pipes/validation.pipe");
const { createProxyMiddleware } = require("http-proxy-middleware");
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use('/', createProxyMiddleware({ target: 'www.google.com', changeOrigin: true }));
        app.use(cookieParser());
        app.enableCors({
            origin: "http://shikin-links.tk/",
            allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
            methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS",
            credentials: true,
            exposedHeaders: ["set-cookie"],
        });
        app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
        await app.listen(PORT, () => console.log(`SERVER START ON PORT: ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=main.js.map