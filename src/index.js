import React from "react";
import { render } from "react-dom";

import { clearElement } from "./utils";
import { getProducts } from "./products";
import { getReviews } from "./reviews";
import { renderAddReviewDialog } from "./form";
import { getStarsEl } from "./stars";
import { enforceValidRating, getAverageRating } from "./rating";
import { App } from "./components/App";

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
  const ratingStarsEl = document.createElement("strong");
  ratingStarsEl.classList.add("review-stars");
  ratingStarsEl.appendChild(getStarsEl(rating));

  const ratingEl = document.createElement("strong");
  ratingEl.innerText = String(enforceValidRating(rating));

  const reviewEl = document.createElement("span");
  reviewEl.classList.add("dim");
  reviewEl.innerText = `, ${review}`;

  const li = document.createElement("li");
  li.classList.add("flex", "align-center");

  li.append(ratingStarsEl, ratingEl, reviewEl);
  return li;
};

/**
 * @param {number} rating
 * @returns {HTMLDivElement}
 */
const getAverageRatingEl = (rating) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("average-rating", "flex", "align-center");

  // Average rating
  const averageEl = document.createElement("span");
  averageEl.classList.add("review-summary-average-rating");
  averageEl.innerText = String(rating);

  // Stars
  const starsEl = getStarsEl(rating);

  wrapper.append(averageEl, starsEl);
  return wrapper;
};

/**
 * @param {number} rating
 * @param {import("./products").Product} product
 * @returns {HTMLDivElement}
 */
const getRatingSummaryEl = (rating, product) => {
  // Wrapper flexbox div
  const reviewSummaryEl = document.createElement("div");
  reviewSummaryEl.classList.add("rating-summary", "flex", "justify-between");

  const averageRatingEl = getAverageRatingEl(rating);

  const addReviewButton = document.createElement("button");
  addReviewButton.innerText = "Add Review";
  addReviewButton.addEventListener("click", () =>
    renderAddReviewDialog(product.id, () => refreshReviewList(product))
  );

  reviewSummaryEl.append(averageRatingEl, addReviewButton);
  return reviewSummaryEl;
};

/**
 * Note: this refresh logic got quite messy. Time to introduce a Reactive library.
 *
 * @param {import("./products").Product} product
 */
const refreshReviewList = async (product) => {
  const reviews = await getReviews(product.id);

  /* Refresh list of reviews */
  const ul = reviewsSection.querySelector("ul");
  if (ul) {
    clearElement(ul);
    reviews.map(toReviewListItem).forEach((li) => ul.appendChild(li));
  }

  /* Refresh average rating */
  const summaryEl = reviewsSection.querySelector(".rating-summary");
  if (summaryEl) {
    const averageRatingEl = summaryEl.querySelector(".average-rating");
    const ratings = reviews.map((review) => review.rating);
    const averageRating = getAverageRating(ratings);
    averageRatingEl?.replaceWith(getAverageRatingEl(averageRating));
  }
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

  const reviews = await getReviews(product.id);

  if (reviews.length === 0) {
    const emptyEl = document.createElement("p");
    emptyEl.innerText = "No reviews yet";
    emptyEl.classList.add("dim");

    reviewsSection.appendChild(emptyEl);
    return;
  }

  const ratings = reviews.map((review) => review.rating);
  const ratingSummaryEl = getRatingSummaryEl(
    getAverageRating(ratings),
    product
  );

  const divider = document.createElement("hr");

  const reviewsHeading = document.createElement("h3");
  reviewsHeading.innerText = "Reviews";

  const ul = document.createElement("ul");

  reviewsSection.append(ratingSummaryEl, divider, reviewsHeading, ul);
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

const root = document.getElementById("app");
render(<App />, root);
