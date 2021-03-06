import { supabase } from "./";

const REVIEWS_TABLE = "product_reviews";

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {number} rating - product rating
 * @property {string} review - message from reviewer to justify their rating
 *
 * @param {string} productId
 * @returns {Promise<Review[]>}
 */
export const getProductReviews = async (productId) => {
  try {
    const result = await supabase
      .from(REVIEWS_TABLE)
      .select("id, rating, review")
      .order("created_at")
      .filter("product_id", "eq", productId);
    if (result.error) {
      console.error(result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * @typedef {Object} NewReview
 * @property {number} rating - product rating
 * @property {string} review - message from reviewer to justify their rating
 *
 * @param {string} productId
 * @param {NewReview} review
 * @returns {Promise<Error>}
 */
export const createProductReview = async (productId, review) => {
  try {
    const result = await supabase
      .from(REVIEWS_TABLE)
      .insert([{ product_id: productId, ...review }]);
    if (result.error) {
      console.error(result.error.message);
      throw new Error(result.error.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
