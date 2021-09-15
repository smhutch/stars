import React from "react";
import { useProductsList } from "../hooks/useProductsList";

export const ProductsList = ({ onSelectProduct }) => {
  const productsList = useProductsList();

  if (!productsList.data && productsList.isValidating) {
    return <p className="dim">Loading products</p>;
  }

  if (productsList.error) {
    return <p className="dim">Failed to fetch products</p>;
  }

  if (!productsList.data) {
    return <p className="dim">No products found</p>;
  }

  return (
    <ul>
      {productsList.data.map((product) => (
        <li key={product.id}>
          <button className="link" onClick={() => onSelectProduct(product)}>
            {product.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
