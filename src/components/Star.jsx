import React from "react";

/**
 * @param {{ type: 'left' | 'right' }} props
 */
export const HalfStar = (props) => {
  return (
    <svg
      className="star-half"
      // Must match the viewBox in index.html
      viewBox="0 0 175 334"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`#star-half-${props.type}`} fill={`url(#star-empty)`} />
    </svg>
  );
};

/**
 * @typedef {keyof typeof starFillIdMap} StarFill
 */
export const starFillIdMap = {
  empty: "star-empty",
  half: "star-half",
  full: "star-full",
};

/**
 * Used to display a star rating
 *
 * @param {{ type: 'empty' | 'half' | 'full' }} props
 */
export const Star = (props) => {
  const fillId = starFillIdMap[props.type];

  return (
    <svg
      className="star"
      // Must match the viewBox in index.html
      viewBox="0 0 350 334"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="#star-whole" fill={`url(#${fillId})`} />
    </svg>
  );
};
