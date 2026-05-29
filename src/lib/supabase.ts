import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient: ReturnType<typeof createClient> | null = null;

/**
 * Lazily initializes and returns the Supabase client.
 * Returns null if environment variables are not set.
 */
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}

/**
 * Fetches all courses ordered by created_at ascending.
 * Returns an empty array on error so the UI degrades gracefully.
 */
export async function getCourses(): Promise<{ data: Course[]; error: string | null }> {
  try {
    const client = getSupabaseClient();
    if (!client) {
      return {
        data: [],
        error: "Supabase environment variables are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel Environment Variables.",
      };
    }

    const { data, error } = await client
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      return { data: [], error: error.message };
    }
    return { data: (data as Course[]) ?? [], error: null };
  } catch (err) {
    return { data: [], error: "Failed to connect to the database." };
  }
}

