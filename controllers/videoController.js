import routes from "../routes";
import Video from "../models/Video";

// 비디오를 로딩하니까 home도 videocontroller로 들어간다
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
  //error가 생기면 video는 없을거고, default로 videos는 빈 array로 설정하기
};
// videos가 home의 템플릿에 전달됨.

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const vidoes = (req, res) =>
  res.render("vidoes", { pageTitle: "Vidoes" });

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

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Vidoe" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTite: "Delete Video" });
