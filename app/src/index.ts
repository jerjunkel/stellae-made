import ImageSearch from "./ImageSearch.js";
import Image from "./Image.js";
const imageSearch = new ImageSearch();

setup();

function setup() {
  searchForImages("landscapes");
  const form = document.querySelector("form");
  const button = document.querySelector("button");
  const inputText = document.querySelector("input");
  const columns = document.querySelectorAll(".column");
  let results = 0;

  if (!form || !button) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  button.addEventListener("click", async (e) => {
    const searchQuery = inputText?.value ?? "random";
    columns.forEach((item) => (item.innerHTML = ""));
    imageSearch.clearSearchResults();
    searchForImages(searchQuery);
  });

  function addImageResults(images: Image[]) {
    const numberOfColumns = columns.length;
    images.forEach((image) => {
      const col = columns[results % numberOfColumns];
      col.appendChild(createImageElement(image));
      results += 1;
    });
  }

  async function loadNextPageResults() {
    try {
      const images = await imageSearch.getNextSearchResults();
      addImageResults(images);
    } catch (error) {
      console.log(error);
    }
  }

  function createImageElement(image: Image) {
    const img = document.createElement("img");
    img.src = image.src.medium;
    img.alt = image.alt;
    return img;
  }

  function addIntersectionObserver() {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        loadNextPageResults();
      },
      {
        rootMargin: "0px 0px 100px 0px",
        threshold: 1.0,
      }
    );
    intersectionObserver.observe(document.querySelector(".more")!);
  }

  async function searchForImages(query: string) {
    const images = await imageSearch.findImagesByQuery(query);
    addImageResults(images);
    addIntersectionObserver();
  }
}
