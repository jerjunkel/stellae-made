import { ImageResponse } from "./Image";
export default class ImageFetcher {
  private next = "";
  constructor() {}

  async fetchImages(url: string): Promise<ImageResponse> {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "sA7VQwMTDPfpxz6nMfgIhLtssilVibdHxgMClKSmzwTLwD2ih5pydqfj",
      },
    });
    const data = (await response.json()) as ImageResponse;
    const { page, photos, next_page } = data;

    const images = photos.map((item) => {
      const { url, src, alt } = item;
      return {
        url,
        src,
        alt,
      };
    });

    this.next = next_page;
    return {
      page,
      photos: images,
      next_page,
    };
  }

  get nextPageURL(): string {
    return this.next;
  }

  resetNext() {
    this.next = "";
  }
}
