"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const validation_pipe_1 = require("./pipes/validation.pipe");
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
            credentials: true
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