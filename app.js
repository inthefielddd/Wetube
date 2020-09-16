import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();
// view engine을 pug로 설정하기
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// 크게 3개로 나눔 홈, users, videos
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.vidoes, videoRouter);

export default app;

// 미들웨어와 url 관리
