import React from "react";
import { getStarFillsForRating } from "../common/stars";
import { Star } from "./Star";

export const Stars = ({ rating }) => {
  const fills = getStarFillsForRating(rating);

  return (
    <div className="flex">
      <Star type={[fills[0]]} />
      <Star type={[fills[1]]} />
      <Star type={[fills[2]]} />
      <Star type={[fills[3]]} />
      <Star type={[fills[4]]} />
    </div>
  );
};
