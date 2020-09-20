import monogoose from "mongoose";

monogoose.connect("mongodb://127.0.0.1:27017/we-tube", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = monogoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ");
const hanldeError = () => console.log("❌ Error on DB Connection:${error}");
// DB를 한번 실행할떄마다
db.once("open", handleOpen);
db.on("error", hanldeError);
