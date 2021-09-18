import { supabase } from "./";

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 *
 * @returns {Promise<Product[]>}
 */
export const getProducts = async () => {
  try {
    const result = await supabase.from("products").select("id, name");
    if (result.error) {
      console.error(result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
