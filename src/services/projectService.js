import { supabase } from "../lib/supabaseClient";

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  console.log("DATA PROJECTS:", data);
  console.log("ERROR PROJECTS:", error);

  return data || [];
}
