import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  // password와 password2 값이 같아야 join을 할수 있다
  if (password !== password2) {
    //status code는 인터넷이 서로 어떻게 상호 작용하는지 표시하는 것
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
      // To Do: Register User
      try {
        const user = await User({
          name,
          email
        });
        await User.register(user, password);
      } catch (error) {
        console.log(error);
        res.redirect(routes.home);
      }
      // To Do: Log user in``
    //To Do: Log user in
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

//사용하지 않은 인자가 있을 때 _를 사용해서 없애주면 된다
//인자 자체를 지우면 안됨, 순서가 달라지기때문에 _로 대체 가능
//cd는 여기서 callback 함수

export const githubLoginCallback = async(_, __, profile, cb) =>{
  const {
    _json:{id, avatar_url:avatarUrl, name, email}
  } = profile;

  try{
    const user = await User.findOne({ email })
    if(user){
      user.githubId = id,
      user.name = name,
      user.email = email,
      user.avatarUrl = avatarUrl,
      console.log(avatarUrl);
      user.save();
      return cb(null, user);
    }else{
      const newUser = await User.create({
        name,
        email,
        githubId:id,
        avatarUrl,
      });
      return cb(null, newUser)
    }
  }catch(error){
    return cb(error);
  }
}

//callback으로 돌아왔을때 로그인이 된 것이기때문에 home화면으로 보내야함
export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

//facebook
export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) =>{
    console.log(accessToken, refreshToken, profile, cb)
}

export const postFacebookLogIn = (req, res) => {
  res.redirect(routes.home);
};




export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) =>{
  res.render("userDetail", { pageTitle: "User Detail", user : req.user });
};

//export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};


export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
