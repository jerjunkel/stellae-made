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

export default Image;
export { ImageResponse };
