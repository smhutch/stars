import React from "react";
import { Review } from "./Review";

export const ReviewsList = (props) => {
  return (
    <ul>
      {props.reviews.map((item) => (
        <li className="flex align-center" key={item.id}>
          <Review rating={item.rating} review={item.review} />
        </li>
      ))}
    </ul>
  );
};
