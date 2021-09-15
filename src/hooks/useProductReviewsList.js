import useSWR from "swr";
import { getReviews } from "../reviews";

export const useProductReviewsList = (productId) => {
  const productReviewsList = useSWR(`/get/products/${productId}`, () =>
    getReviews(productId)
  );
  return productReviewsList;
};
