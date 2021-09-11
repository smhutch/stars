import { getProducts } from "./products";
import { getReviews } from "./reviews";

// TODO: Handle these failing
const productsSection = document.getElementById("products");
const productsList = productsSection.querySelector("ul");
const reviewsSection = document.getElementById("reviews");
const reviewsHeading = reviewsSection.querySelector("h2");
const reviewsList = reviewsSection.querySelector("ul");

const renderReview = ({ rating, review }) => {
  const ratingEl = document.createElement("strong");
  ratingEl.innerText = rating;

  const reviewEl = document.createElement("span");
  reviewEl.innerText = review;

  const li = document.createElement("li");
  li.appendChild(ratingEl);
  li.appendChild(reviewEl);
  reviewsList.appendChild(li);
};

const clearReviewList = () => {
  reviewsList.innerHTML = "";
};

const renderReviewList = async (product) => {
  const reviews = await getReviews(product.id);
  reviewsHeading.innerText = product.name;
  clearReviewList();
  reviews.forEach(renderReview);
};

const renderProductButton = (product) => {
  const button = document.createElement("button");

  button.addEventListener("click", () => {
    renderReviewList(product);
  });

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
