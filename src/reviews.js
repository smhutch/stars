import { supabase } from "./supabase";

// TODO: in memory cache
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
      .from("product_reviews")
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
