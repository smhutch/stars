import { createStarInput, STAR_INPUT_NAME } from "./starInput";
import { clearElement } from "./utils";

const addReviewContainer = document.getElementById("add-review");

const HEADING_ID = "add-review-heading";
const HEADING_TEXT = "Add a review";

const RATING_INPUT_ID = "rating-input";
const RATING_NAME = STAR_INPUT_NAME;

const REVIEW_INPUT_ID = "review-input";
const REVIEW_NAME = "review";

/**
 * @param {Event} event
 */
const handleAddReview = (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const rating = form.get(RATING_NAME);
  const review = form.get(REVIEW_NAME);

  console.log({ rating, review });
  // TODO: make request to add review to DB
  // TODO: handle success response
  // TODO: handle error response
};

/**
 * @returns {HTMLFormElement}
 */
const createAddReviewForm = () => {
  const form = document.createElement("form");
  form.addEventListener("submit", handleAddReview);

  const formRow = document.createElement("div");
  formRow.classList.add("row");

  /* Rating */
  const ratingFormRow = formRow.cloneNode();

  const ratingLabel = document.createElement("label");
  ratingLabel.setAttribute("for", RATING_INPUT_ID);
  ratingLabel.innerText = "Rating";
  ratingFormRow.appendChild(ratingLabel);

  const ratingInput = createStarInput();
  ratingFormRow.appendChild(ratingInput);

  form.appendChild(ratingFormRow);

  /* Review */
  const reviewFormRow = formRow.cloneNode();

  const reviewLabel = document.createElement("label");
  reviewLabel.setAttribute("for", REVIEW_INPUT_ID);
  reviewLabel.innerText = "Review";
  reviewFormRow.appendChild(reviewLabel);

  const reviewInput = document.createElement("input");
  reviewInput.setAttribute("id", REVIEW_INPUT_ID);
  reviewInput.setAttribute("name", REVIEW_NAME);
  reviewInput.setAttribute("type", "text");
  reviewInput.setAttribute("placeholder", "Start typing...");
  reviewInput.setAttribute("required", "true");
  reviewFormRow.appendChild(reviewInput);

  form.appendChild(reviewFormRow);

  /* Submit */
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Submit review";
  form.appendChild(submitButton);

  return form;
};

export const renderAddReviewDialog = () => {
  clearElement(addReviewContainer);

  const dialog = document.createElement("div");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-labelledby", HEADING_ID);

  const heading = document.createElement("h2");
  heading.setAttribute("id", HEADING_ID);
  heading.innerText = HEADING_TEXT;
  dialog.appendChild(heading);

  const form = createAddReviewForm();
  dialog.appendChild(form);

  addReviewContainer.appendChild(dialog);
};
