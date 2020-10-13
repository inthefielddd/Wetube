//localsMiddleware 선언해서 전역적으로 쓰기 위해 선언
//local은 호출만해두고 새로운 파일만들어서 작성하기
import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

//로그아웃 상태인 경우에만 접근을 허용하겠다는 의미
export const onlyPublic = (req,res, next) =>{
  //req.user가 존재하면, 즉 사용자가 로그인된 상태라면
  //그 이후의 controller에는 접근하지 못하게 하려고해
  if(req.user){
    res.redirect(routes.home)
  }else{
    next()
  }
};

//사용자가 로그인된 상태라면 next()
export const onlyPrivate = (req,res,next)=>{
  if(req.user){
    next();
  }else{
    res.redirect(routes.home)
  }
}
export const uploadVideo = multerVideo.single("videoFile");
