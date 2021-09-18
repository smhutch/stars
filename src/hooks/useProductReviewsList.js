import { useEffect, useState } from "react";
import { getReviews } from "../reviews";
import { supabase } from "../supabase";

export const useProductReviewsList = (productId) => {
  const [productReviewsList, setProductReviewsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get product reviews
    getReviews(productId)
      .then((reviews) => {
        setProductReviewsList(reviews);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Subscribe to new product reviews
    const reviewSubscription = supabase
      .from("product_reviews")
      .on("INSERT", (payload) => {
        setProductReviewsList((list) => list.concat(payload.new));
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(reviewSubscription);
    };
  }, [productId]);

  return {
    data: productReviewsList,
    error,
  };
};
