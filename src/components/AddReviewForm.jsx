import React, { useReducer } from "react";
import { createReview } from "../reviews";

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

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SUBMITTING":
      return {
        ...state,
        state: "SUBMITTING",
      };
    case "SET_ERROR":
      return {
        ...state,
        state: "ERROR",
        error: action.error,
      };
    case "SET_SUBMITTED":
      return {
        ...state,
        state: "SUBMITTED",
        error: null,
      };
    default:
      return state;
  }
};

export const AddReviewForm = ({ onSuccess, productId }) => {
  const [{ error, state }, dispatch] = useReducer(reducer, {
    state: "IDLE",
    error: null,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT" });
    const formEl = event.target;
    const form = new FormData(formEl);

    try {
      await createReview(productId, {
        rating: form.get(inputs.rating.name),
        review: form.get(inputs.review.name),
      });
      formEl.reset();
      onSuccess();
      dispatch({ type: "SET_SUBMITTED" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {state === "ERROR" && (
        <div className="row error-message">Failed to add review</div>
      )}
      <div className="row">
        <label htmlFor={inputs.rating.id}>Rating</label>
        [STAR INPUT]
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
      <button disabled={state === "SUBMITTING"} type="submit">
        Submit review
      </button>
    </form>
  );
};
