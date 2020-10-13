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

// export const vidoes = (req, res) =>
//   res.render("vidoes", { pageTitle: "Vidoes" });

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });

  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
  //Video는 실제 ID를 가지고 있기떄문에
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
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
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.render(routes.home);
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
  } catch {
    res.render("editVideo", { pageTitle: "Edit Video" });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findByIdAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
