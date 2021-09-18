import { useEffect, useState } from "react";
import { getProducts } from "../products";
import { supabase } from "../supabase";

export const useProductsList = () => {
  const [productsList, setProductsList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial products list
    getProducts()
      .then((products) => {
        setProductsList(products);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Subscribe to new product inserts
    const productSubscription = supabase
      .from("products")
      .on("INSERT", (payload) => {
        setProductsList((list) =>
          Array.isArray(list) ? list.concat(payload.new) : [payload.new]
        );
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(productSubscription);
    };
  }, []);

  return {
    data: productsList,
    error,
  };
};
