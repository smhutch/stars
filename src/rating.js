export const RATING_MAX = 5;
export const RATING_MIN = 0;
export const RATING_STEP = 1;

/**
 * In practice this should not be necessary on the frontend because we also
 * perform DB level validation to enforce valid ratings.
 * Still, better safe than sorry.
 *
 * @param {number} rating any numeric rating
 * @returns {number} a valid that respects the MIN, MAX and STEP values
 */
export const enforceValidRating = (rating) => {
  if (rating < RATING_MIN) {
    return RATING_MIN;
  }

  if (rating > RATING_MAX) {
    return RATING_MAX;
  }

  const remainder = rating % RATING_STEP;
  if (remainder !== 0) {
    if (remainder < RATING_STEP / 2) {
      return Math.floor(rating);
    } else {
      return Math.ceil(rating);
    }
  }

  return rating;
};
