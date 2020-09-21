import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = (req, res) =>
  console.log(`✅Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);

// init.js에서는 서버연결하는 것만 따로 관리
