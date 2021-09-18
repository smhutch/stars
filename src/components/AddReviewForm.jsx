import React, { useState } from "react";
import { createReview } from "../reviews";
import { StarInput } from "./StarInput";

const inputs = {
  rating: {
    name: "rating",
    id: "rating-input",
  },
  review: {
    name: "review",
    id: "review-input",
  },
};

export const AddReviewForm = ({ onSuccess, productId }) => {
  const [status, setStatus] = useState("IDLE");

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("SUBMITTING");

    const formEl = event.target;
    const form = new FormData(formEl);

    try {
      await createReview(productId, {
        rating: form.get(inputs.rating.name),
        review: form.get(inputs.review.name),
      });
      formEl.reset();
      setStatus("SUBMITTED");
      onSuccess();
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {status === "ERROR" && (
        <div className="row error-message">Failed to add review</div>
      )}
      <div className="row">
        <label htmlFor={inputs.rating.id}>Rating</label>
        <StarInput id="add-review-star-input" />
      </div>
      <div className="row">
        <label htmlFor={inputs.review.id}>Review</label>
        <input
          id={inputs.review.id}
          name={inputs.review.name}
          placeholder="Start typing..."
          required
          type="text"
        />
      </div>
      <button disabled={status === "SUBMITTING"} type="submit">
        Submit review
      </button>
    </form>
  );
};
