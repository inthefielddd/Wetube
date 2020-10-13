import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";

import "./passport";

const app = express();

const CokieStore = MongoStore(session)

// 헬멧을 제일 위에다 배치
app.use(helmet({ contentSecurityPolicy: false }));
// view engine을 pug로 설정하기
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store:new CokieStore({mongooseConnection:mongoose.connection})
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// 크게 3개로 나눔 홈, users, videos
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.vidoes, videoRouter);

export default app;

// 미들웨어와 url 관리
