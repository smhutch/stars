import { supabase } from "./supabase";

// TODO: in memory cache
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
export const getReviews = async (productId) => {
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
export const createReview = async (productId, review) => {
  try {
    const result = await supabase
      .from(REVIEWS_TABLE)
      .insert([{ product_id: productId, ...review }]);
    if (result.error) {
      console.error(result.error.message);
      return new Error(result.error.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return new Error(error.message);
  }
};
