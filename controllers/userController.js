import routes from "../routes";
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  // password와 password2 값이 같아야 join을 할수 있다
  if (password !== password2) {
    //status code는 인터넷이 서로 어떻게 상호 작용하는지 표시하는 것
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //To Do:Register User
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

// 로그인을 완료했을때
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.redirect(routes.home);
  //동시에 isAuthenicated가 false가 되어야함
  // res.render("logout", { pageTitle: "Logout" });
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
