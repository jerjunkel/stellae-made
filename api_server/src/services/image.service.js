import apiClient from "../common/apiClient.js";

const findImageByQuery = async (query) => {
  try {
    const response = await apiClient.get(`/search?query=${query}&per_page=30`);
    const data = response.data;
    const images = data.photos.map((item) => {
      const { url, src, alt } = item;
      return {
        url,
        src,
        alt,
      };
    });

    return images;
  } catch (e) {
    console.log(e);
  }
};

export default { findImageByQuery };
