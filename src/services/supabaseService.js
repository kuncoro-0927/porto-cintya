import { supabase } from "../lib/supabaseClient";

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  console.log("DATA PROJECTS:", data);
  console.log("ERROR PROJECTS:", error);

  return data || [];
}

export async function getWorkExperiences() {
  const { data, error } = await supabase.from("work_experiences").select("*");

  console.log("DATA WORK EXPERIENCES:", data);
  console.log("ERROR WORK EXPERIENCES:", error);

  return data || [];
}

export async function getProfile() {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .maybeSingle();

  console.log("DATA PROFILE:", data);
  console.log("ERROR PROFILE:", error);

  if (error) {
    throw error;
  }

  return data;
}
