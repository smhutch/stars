import { getProducts } from "./products";
import { getReviews } from "./reviews";

// TODO: Handle these failing
const productsSection = document.getElementById("products");
const productsList = productsSection.querySelector("ul");
const reviewsSection = document.getElementById("reviews");
const reviewsList = reviewsSection.querySelector("ul");

const clearElement = (element) => {
  element.innerHTML = "";
};

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

const renderReviewList = async (product) => {
  clearElement(reviewsSection);

  const productNameHeading = document.createElement("h2");
  productNameHeading.innerText = product.name;
  reviewsSection.appendChild(productNameHeading);

  // TODO: Retrieve average review score from server
  // TODO: render average review score inside flex element

  const addReviewButton = document.createElement("button");
  addReviewButton.innerText = "Add Review";
  // TODO: open dialog when clicked
  addReviewButton.addEventListener("click", console.log);
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

const renderProductButton = (product) => {
  const button = document.createElement("button");

  button.addEventListener("click", () => {
    renderReviewList(product);
  });

  button.classList.add("link");
  button.innerText = product.name;

  const li = document.createElement("li");
  li.appendChild(button);
  productsList.appendChild(li);
};

const renderProductList = async () => {
  const products = await getProducts();
  products.forEach(renderProductButton);
};

const init = () => {
  renderProductList();
};

init();
