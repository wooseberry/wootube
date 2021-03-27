import routes from "./routes";
import multer from "multer";

//destination
export const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WooTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    }
    next();
};


//single은 오직 하나의 파일만 upload 할 수 있는 걸 의미 해
export const uploadVideo = multerVideo.single("videoFile");