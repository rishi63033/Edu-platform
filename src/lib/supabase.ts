import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton for the server client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches all courses ordered by created_at ascending.
 * Returns an empty array on error so the UI degrades gracefully.
 */
export async function getCourses(): Promise<{ data: Course[]; error: string | null }> {
  try {
    const { data, error } = await supabase
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
