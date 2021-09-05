import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "./pipes/validation.pipe";


const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.enableCors({
      origin: 'https://techno-train.netlify.app/',
      methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS",
      credentials: true,
      exposedHeaders: ["set-cookie"]
    });
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`SERVER START ON PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
