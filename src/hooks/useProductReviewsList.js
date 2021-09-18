import { useEffect, useState } from "react";
import { getProductReviews } from "../supabase/productReviews";
import { supabase } from "../supabase";

// Minimal in-memory cache to avoid too many loading states when
// changing between product pages
let productReviewsListCache = {};

export const useProductReviewsList = (productId) => {
  const [productReviewsList, setProductReviewsList] = useState(
    // Initialize with product reviews from cache where possible
    productReviewsListCache[productId] || null
  );
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

  useEffect(() => {
    // Whenever productReviewsList changes, update the cache
    productReviewsListCache[productId] = productReviewsList;
  }, [productReviewsList]);

  return {
    data: productReviewsList,
    error,
  };
};
