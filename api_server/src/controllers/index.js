import service from "../services/image.service.js";
const findImageByQuery = async (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  try {
    const response = await service.findImageByQuery(query);
    const { next_page } = response;
    const nextQuery = next_page.split("search/")[1];
    response.next_page = `http://${req.headers.host}/search/${nextQuery}`;
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

export default {
  findImageByQuery,
};
