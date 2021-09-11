import { supabase } from "./supabase";

// TODO: in memory cache
export const getProducts = async () => {
  try {
    const result = await supabase.from("products").select("id, name");
    if (result.error) {
      console.error(result.error);
    }

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
