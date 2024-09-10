import apiClient from "../common/apiClient.js";

const findImageByQuery = async (query) => {
  try {
    const response = await apiClient.get(`/search?query=${query}&per_page=30`);
    const { page, photos, next_page } = response.data;
    const images = photos.map((item) => {
      const { url, src, alt } = item;
      return {
        url,
        src,
        alt,
      };
    });

    return {
      page,
      images,
      next_page,
    };
  } catch (e) {
    console.log(e);
  }
};

export default { findImageByQuery };
