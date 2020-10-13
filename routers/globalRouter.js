import express from "express";
import passport from "passport";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogIn,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic , onlyPrivate} from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

//사용자가 로그인이 되어있다면 이런것들을 보게 하고싶지않음, onlyPublic middleware추가
globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

//login
globalRouter.get(routes.login,onlyPublic, getLogin);
globalRouter.post(routes.login,onlyPublic, postLogin);

// join
globalRouter.get(routes.join, onlyPublic,getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

//github
//github route로 들어가면 githubLogin을 써서 인증할것이다
//githubLogin이 실행되면서 우리를 깃헙 웹사이트로 보내주는 역할을 한다
globalRouter.get(routes.gitHub, githubLogin);

//로그인이 잘 되었을때 사용자를 callbackURL로 데려올텐데, 그말은 사용자가 로그인이 된다는 뜻, 
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn,
);

//Facebook
globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(routes.facebookCallback, 
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogIn
)

globalRouter.get(routes.me, getMe);


export default globalRouter;

