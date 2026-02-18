import type { Skill } from "@/types/api/Skill";
import { User } from "@/types/api/User";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const client = createClient(supabaseUrl, supabaseAnonKey);
export const getUser: (id: string) => Promise<User> = async (id: string) => {
  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return new User({
    ...data,
    githubId: data.github_id,
    qiitaId: data.qiita_id,
    xId: data.x_id,
  });
};

export const getUserSkills: (id: string) => Promise<Skill[]> = async (
  user_id: string,
) => {
  const { data: userSkills, error: userSkillsError } = await client
    .from("user_skill")
    .select("*")
    .eq("user_id", user_id);
  if (userSkillsError) {
    throw userSkillsError;
  }
  const skillIds = userSkills.map((skill) => skill.skill_id);
  const { data: skills, error: skillsError } = await client
    .from("skills")
    .select("*")
    .in("id", skillIds);
  if (skillsError) {
    throw skillsError;
  }
  return skills;
};

export const registerUser = async (props: User) => {
  const { data, error } = await client.from("users").insert({
    id: props.id,
    name: props.name,
    description: props.description,
    github_id: props.githubId,
    qiita_id: props.qiitaId,
    x_id: props.xId,
  });
  if (error) {
    throw error;
  }
  return data;
};

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
