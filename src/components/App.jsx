import React from "react";
import { ProductsList } from "./ProductsList";
import { ProductReviews } from "./ProductReviews";

export const App = () => {
  const [activeProduct, setActiveProduct] = React.useState(null);

  return (
    <>
      <section>
        <h1>Books</h1>
        <ProductsList onSelectProduct={setActiveProduct} />
      </section>
      {activeProduct && (
        <>
          <hr />
          <ProductReviews {...activeProduct} />
        </>
      )}
    </>
  );
};
