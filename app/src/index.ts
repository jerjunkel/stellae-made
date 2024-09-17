import ImageSearch from "./ImageSearch.js";
import Image from "./Image.js";
const imageSearch = new ImageSearch();

setup();

function setup() {
  searchForImages("landscapes");
  addIntersectionObserver();
  const form = document.querySelector("form");
  const button = document.querySelector("button");
  const inputText = document.querySelector("input");
  const columns = document.querySelectorAll(".results__column");
  const resultsTitle = document.querySelector(".results__title");
  let results = 0;

  if (!form || !button) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  button.addEventListener("click", async (e) => {
    const query = inputText?.value ?? "random";
    if (query == "" || !query) return;
    columns.forEach((item) => (item.innerHTML = ""));
    imageSearch.clearSearchResults();
    results = 0;
    searchForImages(query);
  });

  function addImageResults(images: Image[]) {
    const numberOfColumns = columns.length;
    const columnFragments = createColumnFragments(numberOfColumns);

    images.forEach((image) => {
      const columnFragment = columnFragments[results % numberOfColumns];
      const imageElement = createImageElement(image);
      columnFragment.appendChild(imageElement);
      results += 1;
    });

    addColumnFragments(columnFragments);
  }

  function createColumnFragments(numberOfColumns: number): DocumentFragment[] {
    let columnFragments: DocumentFragment[] = [];
    for (let x = 0; x < numberOfColumns; x++) {
      columnFragments.push(new DocumentFragment());
    }

    return columnFragments;
  }

  function addColumnFragments(fragments: DocumentFragment[]) {
    fragments.forEach((fragment, index) => {
      columns[index].appendChild(fragment);
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
    img.classList.add("results__img");
    img.alt = image.alt;
    img.onload = (e) => {
      const target = e.target as HTMLImageElement;
      target.classList.add("loaded");

      setTimeout(() => {
        img.src = image.src.large;
      }, 1200);
    };
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
    updateSearchTitle(query);
    addImageResults(images);
  }

  function updateSearchTitle(query: string) {
    if (!resultsTitle) return;
    resultsTitle!.innerHTML = `Showing results for: <span class="query"> ${query} </span>`;
  }
}
