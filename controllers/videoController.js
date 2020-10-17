import routes from "../routes";
import Video from "../models/Video";

// 비디오를 로딩하니까 home도 videocontroller로 들어간다
export const home = async (req, res) => {
  try {
    //database에 있는 모든 Video를 가져올 것이다
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    throw Error("now is error");
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
// videos가 home의 템플릿에 전달됨.

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //const searchingBy = req.query.term
  //term에 이름 할당, 변수명 searchingBy
  let videos = [];
  // videos는 지금 빈 array임
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }

  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async(req, res) =>{
  const {
    body :{title, description},
    file :{path}
   } = req;
   //만들어질 비디오에 user의 id 값을 가져온다
   //req안에 user객체가 있다 
   //로그인을 했기 때문에 (passport)
   const newVideo = await Video.create({
     fileUrl :path,
     title,
     description,
     creator : req.user.id
   });
   //로그인한유저가 upload를 하면 req안에있는 user객체안에 만든 비디오의 id 값을 넣어준디ㅏ
   req.user.videos.push(newVideo.id);
   req.user.save();
   res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    //객체를 데려오는 함수 populate
    // populate는 object ID타입에만 쓸 수 있다
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  //어떤비디오를 수정하는지 알기위해 id(url)값 필요
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if(video.creator !== req.user.id){
      throw Error();
    }else{
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findByIdAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch(error) {
    res.render("editVideo", { pageTitle: "Edit Video" });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if(video.creator !== req.user.id){
      throw Error();
    }else{
      await Video.findByIdAndRemove({ _id: id });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
