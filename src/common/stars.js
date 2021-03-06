import { RATING_MAX } from "./rating";

/**
 * Magic numbers! 🪄
 * These are the viewbox values of the asset I downloaded from svgrepo
 * @link https://www.svgrepo.com/svg/17906/star
 */
const VIEWBOX = 329.942;
const VIEWBOX_X = VIEWBOX;
const VIEWBOX_Y = VIEWBOX;
export const VIEWBOX_COORDS = `0 0 ${VIEWBOX} ${VIEWBOX}`;

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const STAR_PATH_ID = "star-path";

/**
 * @typedef {keyof typeof starFillIdMap} StarFill
 */
export const starFillIdMap = {
  empty: "star-empty",
  half: "star-half",
  full: "star-full",
};

/**
 * @param {string} tag
 * @returns {SVGElement}
 */
const createSVGElement = (tag) => document.createElementNS(SVG_NAMESPACE, tag);

/**
 * @returns {SVGElement}
 */
const createStarSvg = () => {
  const starSvg = createSVGElement("svg");
  starSvg.setAttribute("xmlns", SVG_NAMESPACE);
  starSvg.setAttribute("viewBox", `0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`);
  starSvg.classList.add("star");

  return starSvg;
};

const starSvg = createStarSvg();

/**
 * @param {StarFill} starFill
 * */
export const createStarEl = (starFill) => {
  const star = starSvg.cloneNode(true);

  const use = createSVGElement("use");
  use.setAttribute("href", `#${STAR_PATH_ID}`);
  use.setAttribute("fill", `url(#${starFillIdMap[starFill]})`);
  star.appendChild(use);

  return star;
};

/**
 * @param {number} rating
 * @returns {StarFill[]}
 */
export const getStarFillsForRating = (rating) => {
  /** @type {StarFill[]} */
  const stars = [];

  for (let star = 1; star <= RATING_MAX; star++) {
    /*
      Handles cases where rating is lower than current star,
      and also above the one below it.

      In this case, it must be a float value between the two stars.
      Let's round it to a full or empty star.
    */
    if (rating < star && rating > star - 1) {
      const percentage = rating - star + 1;
      // Multiplied by 2 to create three possible values [0,1,2]
      // These values correspond to the three possible states of the star [empty, half, full]
      const closestInteger = Math.round(percentage * 2);

      switch (closestInteger) {
        case 0:
          stars.push("empty");
          break;
        case 1:
          stars.push("half");
          break;
        case 2:
          stars.push("full");
      }

      continue;
    }

    if (rating >= star) {
      stars.push("full");
      continue;
    }

    stars.push("empty");
  }

  return stars;
};

/**
 * @param {number} rating
 * @returns {HTMLDivElement}
 */
export const getStarsEl = (rating) => {
  const div = document.createElement("div");
  div.setAttribute("title", `Rated ${rating} of ${RATING_MAX}`);
  div.classList.add("flex");

  const starFills = getStarFillsForRating(rating);
  starFills.forEach((starFill) => {
    const starEl = createStarEl(starFill);
    div.appendChild(starEl);
  });

  return div;
};
