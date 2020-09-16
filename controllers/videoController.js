// 비디오를 로딩하니까 home도 videocontroller로 들어간다
export const home = (req, res) => res.send("Home");
export const search = (req, res) => res.send("Search");
export const vidoes = (req, res) => res.send("vidoes");
export const upload = (req, res) => res.send("upload");
export const videoDetail = (req, res) => res.send("videoDetail");
export const editVideo = (req, res) => res.send("editVideo");
export const deleteVideo = (req, res) => res.send("deleteVideo");
