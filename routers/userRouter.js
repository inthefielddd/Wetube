import express from "express";
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.editProfile,onlyPrivate, editProfile);
userRouter.get(routes.userDetail(), userDetail);
//userRouter.get(routes.users, users);

export default userRouter;
