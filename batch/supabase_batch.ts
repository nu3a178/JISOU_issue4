import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

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
