import React from "react";

import { starFillIdMap, VIEWBOX_COORDS } from "../stars";

/**
 * @param {{ type: 'empty' | 'full' }} props
 */
export const Star = (props) => {
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
