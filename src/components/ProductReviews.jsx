import React from "react";
import { useProductReviewsList } from "../hooks/useProductReviewsList";
import { getAverageRating } from "../rating";
import { AverageRating } from "./AverageRating";

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
      <div className="review-summary flex justify-between align-center">
        {!productReviews.data || productReviews.data.length < 1 ? (
          <p className="dim">No reviews yet</p>
        ) : (
          <AverageRating
            ratings={productReviews.data.map((review) => review.rating)}
          />
        )}
        <button>Add Review</button>
      </div>
      {productReviews.data && (
        <>
          <hr />
          <h3>Reviews</h3>
          <ul>
            <li>[Review]</li>
          </ul>
        </>
      )}
    </ProductReviewsSection>
  );
};
