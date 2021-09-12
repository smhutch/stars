import { clearElement } from "./utils";
import { getProducts } from "./products";
import { getReviews } from "./reviews";
import { renderAddReviewDialog } from "./form";

const productsSection = document.getElementById("products");
if (!productsSection) {
  throw new Error("Element with id of 'products' was not found");
}

const reviewsSection = document.getElementById("reviews");
if (!reviewsSection) {
  throw new Error("Element with id of 'reviews' was not found");
}

/**
 * @param {import("./reviews").Review} review
 * @returns {HTMLLIElement}
 */
const toReviewListItem = ({ rating, review }) => {
  const ratingEl = document.createElement("strong");
  ratingEl.innerText = rating;

  const reviewEl = document.createElement("span");
  reviewEl.classList.add("dim");
  reviewEl.innerText = review;

  const li = document.createElement("li");
  li.appendChild(ratingEl);
  li.appendChild(reviewEl);
  return li;
};

/**
 * @param {import("./products").Product} product
 * @returns void
 */
const renderReviewList = async (product) => {
  clearElement(reviewsSection);

  const productNameHeading = document.createElement("h2");
  productNameHeading.innerText = product.name;
  reviewsSection.appendChild(productNameHeading);

  // TODO: Retrieve average review score from server
  // TODO: render average review score inside flex element

  const addReviewButton = document.createElement("button");
  addReviewButton.innerText = "Add Review";
  addReviewButton.addEventListener("click", () => renderAddReviewDialog());
  reviewsSection.appendChild(addReviewButton);

  const divider = document.createElement("hr");
  reviewsSection.appendChild(divider);

  const reviewsHeading = document.createElement("h3");
  reviewsHeading.innerText = "Reviews";
  reviewsSection.appendChild(reviewsHeading);

  const ul = document.createElement("ul");
  reviewsSection.appendChild(ul);

  const reviews = await getReviews(product.id);
  reviews.map(toReviewListItem).forEach((li) => ul.appendChild(li));
};

/**
 *
 * @param {import("./products").Product} product
 * @returns {HTMLLIElement}
 */
const toProductButtonListItem = (product) => {
  const button = document.createElement("button");

  button.addEventListener("click", () => {
    renderReviewList(product);
  });

  button.classList.add("link");
  button.innerText = product.name;

  const li = document.createElement("li");
  li.appendChild(button);

  return li;
};

const renderProductList = async () => {
  const ul = document.createElement("ul");
  productsSection.appendChild(ul);

  const products = await getProducts();
  products.map(toProductButtonListItem).forEach((li) => ul.appendChild(li));
};

const init = () => {
  renderProductList();
};

init();
