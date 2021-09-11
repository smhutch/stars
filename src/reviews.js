import { supabase } from "./supabase";

// TODO: in memory cache
export const getReviews = async (productId) => {
  try {
    const result = await supabase
      .from("product_reviews")
      .select("rating, review")
      .order("created_at")
      .filter("product_id", "eq", productId);
    if (result.error) {
      console.error(result.error);
    }

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
