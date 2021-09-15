import React from "react";

export const ProductReviews = ({ name }) => {
  return (
    <section>
      <h2>{name}</h2>
      <div className="flex justify-between">
        <div>[Stars]</div>
        <button>Add Review</button>
      </div>
      <hr />
      <h3>Reviews</h3>
      <ul>
        <li>[Review]</li>
      </ul>
    </section>
  );
};
