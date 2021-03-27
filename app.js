//require가 하는일은 어딘가에서 express를 가져 오는 거야 
//const express = require('express');  = (구버전)
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from './middlewares';
// export 할때 default로 하지않으면 이렇게 import
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();

//위에서 아래로 실행되기 때문에 위치가 중요
app.use(helmet());
app.set("view engine", "pug");
// /uploads로 가면 uploads라는 directory 안으로 들어간단은 거지
//static = directory 에서 file을 보내주는 middleware야
app.use("/uploads", express.static("uploads"))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//동영상 재생안됨 임시 해결책
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
});


app.use(localsMiddleware);
//use의 의미는 누가 /user경로에 접속하면 이 router전체를 사용하겠다는 의미야
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
//respond with "hello world" when a GET request is made to the homepage
//누군가가 불러오려할때 app object를 주겠다

export default app;