import express from "express";
import {
  deleteVideo,
  editVideo,
  videoDetail,
  getUpload,
  postUpload,
  vidoes,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoController";

import routes from "../routes";
import { onlyPrivate, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.vidoes, vidoes);

//Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate,  getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
