import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes"

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:2000${routes.githubCallback}`
    },
    //깃헙에서 사용자 정보를 받고 callbackURL로 와서 실행될 함수
    //사용자 정보를 가지고 돌아왔을때 이 함수가 실행된다
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID:process.env.FB_ID,
      clientSecret:process.env.FB_GH_SECRET,
      callbackURL: `http://localhost:2000${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());