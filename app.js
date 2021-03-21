//require가 하는일은 어딘가에서 express를 가져 오는 거야 
//const express = require('express');  = (구버전)
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// export 할때 default로 하지않으면 이렇게 import
import  userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();

//위에서 아래로 실행되기 때문에 위치가 중요
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

//use의 의미는 누가 /user경로에 접속하면 이 router전체를 사용하겠다는 의미야
app.use("/", globalRouter);
app.use( userRouter);
app.use( videoRouter);
//respond with "hello world" when a GET request is made to the homepage
//누군가가 불러오려할때 app object를 주겠다
export default app;