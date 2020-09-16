// 비디오를 로딩하니까 home도 videocontroller로 들어간다
export const home = (req, res) => res.render("home");
export const search = (req, res) => res.render("search");
export const vidoes = (req, res) => res.render("vidoes");
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");
