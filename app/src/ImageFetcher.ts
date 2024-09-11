import { ImageResponse } from "./Image";
export default class ImageFetcher {
  private next = "";
  constructor() {}

  async fetchImages(url: string): Promise<ImageResponse> {
    const response = await fetch(url);
    const data = (await response.json()) as ImageResponse;
    this.next = data.next_page;
    return data;
  }

  get nextPageURL(): string {
    return this.next;
  }
}
