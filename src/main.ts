import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "./pipes/validation.pipe";
const { createProxyMiddleware } = require("http-proxy-middleware");

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.use('/', createProxyMiddleware({ target: 'www.google.com', changeOrigin: true }));
    app.use(cookieParser());

    /*const whitelist = ['https://techno-train.netlify.app/',
      'http://shikin-links.tk/', 'https://react-zp9giu.stackblitz.io/'];*/
    app.enableCors({
      origin: "http://shikin-links.tk/",
      allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
      methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS",
      credentials: true,
      exposedHeaders: ["set-cookie"],
    });
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`SERVER START ON PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
