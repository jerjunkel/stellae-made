import ImageFetcher from "./ImageFetcher.js";
import ImageStore from "./ImageStore.js";
import Image from "./Image.js";

export default class ImageSearch {
  private store = new ImageStore();
  private fetcher = new ImageFetcher();
  private baseUrl = "https://api.pexels.com/v1/search";
  constructor() {}

  async findImagesByQuery(query: string): Promise<Image[]> {
    const response = await this.fetcher.fetchImages(
      `${this.baseUrl}?query=${query}`
    );
    this.store.addImages(response.photos);
    return response.photos;
  }

  async getNextSearchResults(): Promise<Image[]> {
    const response = await this.fetcher.fetchImages(this.fetcher.nextPageURL);
    return response.photos;
  }

  clearSearchResults() {
    this.store.empty();
    this.fetcher.resetNext();
  }
}
