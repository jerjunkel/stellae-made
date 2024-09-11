type Image = {
  url: string;
  alt: string;
  src: {
    original: string;
    small: string;
    medium: string;
    large: string;
  };
};

type ImageResponse = {
  page: number;
  images: Image[];
  next_page: string;
};

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
