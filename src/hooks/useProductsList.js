import React, { useEffect, useState } from "react";
import { getProducts } from "../products";

export const useProductsList = () => {
  const [products, setProducts] = useState({
    products: [],
    errors: null,
    isFetching: true,
  });

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts({
          products,
          errors: null,
          isFetching: false,
        });
      })
      .catch((error) => {
        setProducts({ products: [], errors: [error], isFetching: false });
      });
  }, []);

  return products;
};
