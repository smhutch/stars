import React from "react";
import { useProductsList } from "../hooks/useProductsList";

export const ProductsList = ({ onSelectProduct }) => {
  const productsList = useProductsList();

  if (productsList.isFetching) {
    return <p className="dim">Loading products</p>;
  }

  if (productsList.errors) {
    return <p className="dim">Failed to fetch products</p>;
  }

  return (
    <ul>
      {productsList.products.map((product) => (
        <li key={product.id}>
          <button className="link" onClick={() => onSelectProduct(product)}>
            {product.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
