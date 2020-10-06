import monogoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

monogoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = monogoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ");
const hanldeError = () => console.log("❌ Error on DB Connection:${error}");
// DB를 한번 실행할떄마마
db.once("open", handleOpen);
// db연결 에러 났을때
db.on("error", hanldeError);
