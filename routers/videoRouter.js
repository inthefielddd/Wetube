import express from "express";
import {
  deleteVideo,
  editVideo,
  videoDetail,
  getUpload,
  postUpload,
  vidoes,
} from "../controllers/videoController";

import routes from "../routes";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.vidoes, vidoes);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
