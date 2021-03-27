import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        //얘네가 무슨일을 하는지는 알필요 없고 그냥 설정임
        //mongoDB가 Hey 이 configuration 을 추가해 라고 함
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;


const handleOpen = () => console.log("✅  Connected to DB");
const handleError = () => console.log(`❌ Error on DB Connection:${error}`);
//once=한번실행
//connetion을 열고 성공여부를 확인 하는 function
db.once("open", handleOpen);
db.on("error", handleError);