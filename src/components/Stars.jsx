import React from "react";
import { getStarFillsForRating, starFillIdMap, VIEWBOX_COORDS } from "../stars";

/**
 * @param {{ type: 'empty' | 'full' }} props
 */
const Star = (props) => {
  const fillId = starFillIdMap[props.type];

  return (
    <svg
      className="star"
      viewBox={VIEWBOX_COORDS}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="#star-path" fill={`url(#${fillId})`} />
    </svg>
  );
};

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
