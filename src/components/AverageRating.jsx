import React from "react";
import { getAverageRating } from "../rating";
import { Stars } from "./Stars";

export const AverageRating = ({ ratings }) => {
  const averageRating = getAverageRating(ratings);

  return (
    <div className="flex align-center">
      <span className="average-rating">{averageRating}</span>
      <Stars rating={averageRating} />
    </div>
  );
};
