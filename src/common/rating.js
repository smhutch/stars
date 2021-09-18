export const RATING_MAX = 5;
export const RATING_MIN = 0;

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

  const percentage = rating % 1;
  if (percentage !== 0) {
    // Round down when less than 0.25
    if (percentage < 0.25) {
      return Math.floor(rating);
    }

    // Round to 0.5 when between 0.25 and 0.75
    if (percentage < 0.75) {
      return Math.floor(rating) + 0.5;
    }

    // Round up when more than 0.75
    return Math.ceil(rating);
  }

  return rating;
};

/**
 *
 * @param {number[]} ratings
 * @returns {number}
 */
export const getAverageRating = (ratings) => {
  const ratingsCount = ratings.length;
  const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);

  /** Fix floating point rounding errors */
  return Number((totalRating / ratingsCount).toFixed(2));
};
