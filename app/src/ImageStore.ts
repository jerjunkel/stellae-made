import Image from "./Image";
export default class ImageStore {
  private store: Image[] = [];

  get size(): number {
    return this.store.length;
  }

  addImages(image: Image[]) {
    this.store = [...this.store, ...image];
  }

  addImage(image: Image) {
    this.store.push(image);
  }

  getAllImages(): Image[] {
    return [...this.store];
  }
  empty() {
    this.store = [];
  }
}
