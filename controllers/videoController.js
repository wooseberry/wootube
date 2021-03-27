import { videos } from "../db";
import routes from "../routes";
import Video from "../models/Video";


//async는 너를 기다려주는 무언가야
//javascript야 이 funciton 의 어떤 부분은 꼭 기다려야해
//await 키워드는 async없이는 쓸 수 없어
//javascript는 default로 널 기다리게 프로그래밍 되어있지 않아
//try catch
export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos });

    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }

};

export const search = (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    //새로운 객체 생성
    //여기서의 Video가 스키마에 있는 Video
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    })

    // To Do : Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));

};

export const videoDetail = (req, res) =>
    res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
    res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
    res.render("deleteVideo", { pageTitle: "Delete Video" });
