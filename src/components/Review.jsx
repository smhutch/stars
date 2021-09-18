import React from "react";
import { enforceValidRating } from "../common/rating";
import { Stars } from "./Stars";

export const Review = (props) => {
  const rating = enforceValidRating(props.rating);

  return (
    <>
      <span className="review-stars">
        <Stars rating={rating} />
      </span>
      <strong>{rating}</strong>
      <span className="dim">, {props.review}</span>
    </>
  );
};
