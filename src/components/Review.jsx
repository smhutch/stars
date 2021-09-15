import React from "react";
import { Stars } from "./Stars";

export const Review = (props) => {
  return (
    <>
      <span className="review-stars">
        <Stars rating={props.rating} />
      </span>
      <strong>{props.rating}</strong>
      <span className="dim">, {props.review}</span>
    </>
  );
};
