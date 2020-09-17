//localsMiddleware 선언해서 전역적으로 쓰기 위해 선언
//local은 호출만해두고 새로운 파일만들어서 작성하기

import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  next();
};
