import { useEffect, useState } from "react";
import { getProductReviews } from "../supabase/productReviews";
import { supabase } from "../supabase";

export const useProductReviewsList = (productId) => {
  const [productReviewsList, setProductReviewsList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductReviews(productId)
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
        setProductReviewsList((list) =>
          Array.isArray(list) ? list.concat(payload.new) : [payload.new]
        );
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
