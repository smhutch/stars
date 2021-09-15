import useSWR from "swr";
import { getProducts } from "../products";

export const useProductsList = () => {
  const productsList = useSWR("getProducts", getProducts);
  return productsList;
};
