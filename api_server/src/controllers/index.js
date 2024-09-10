import service from "../services/image.service.js";
const findImageByQuery = async (req, res) => {
  const query = encodeURI(req.query.query);

  try {
    const response = await service.findImageByQuery(query);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

export default {
  findImageByQuery,
};
