import React from "react";
import { useProductReviewsList } from "../hooks/useProductReviewsList";

const ProductReviewsSection = ({ children, title }) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export const ProductReviews = ({ id, name }) => {
  const productReviews = useProductReviewsList(id);

  if (!productReviews.data && productReviews.isValidating) {
    return (
      <ProductReviewsSection title={name}>
        <p className="dim">Loading reviews</p>
      </ProductReviewsSection>
    );
  }

  if (productReviews.error) {
    return (
      <ProductReviewsSection title={name}>
        Failed to fetch reviews
      </ProductReviewsSection>
    );
  }

  return (
    <ProductReviewsSection title={name}>
      <div className="flex justify-between">
        <div>[Stars]</div>
        <button>Add Review</button>
      </div>
      <hr />
      <h3>Reviews</h3>
      <ul>
        <li>[Review]</li>
      </ul>
    </ProductReviewsSection>
  );
};
