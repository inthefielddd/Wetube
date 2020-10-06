import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";

const app = express();

// 헬멧을 제일 위에다 배치
app.use(helmet());
// view engine을 pug로 설정하기
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(localsMiddleware);

// 크게 3개로 나눔 홈, users, videos
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.vidoes, videoRouter);

export default app;

// 미들웨어와 url 관리
