import { createClient } from "@/utils/supabase/server";

export async function getAllIngredients() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Ingredients')
    .select('*');
  console.log(data)
  if (error) {
    console.error("Error fetching ingredients:", error);
    return null;
  }

  return data;
}
