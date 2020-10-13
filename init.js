import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

// 데이터의 구조인 model들 연결해주기
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 2000;

const handleListening = (req, res) =>
  console.log(`✅Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);

// init.js에서는 서버연결하는 것만 따로 관리
