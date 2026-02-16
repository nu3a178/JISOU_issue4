import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
}

const client = createClient(supabaseUrl, supabaseAnonKey);

export const deleteAllUsers = async () => {
  const { data, error } = await client.from("users").delete().gte("id", 0);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteAllUserSkills = async () => {
  const { data, error } = await client.from("user_skill").delete().gte("id", 0);
  if (error) {
    throw error;
  }
  return data;
};
