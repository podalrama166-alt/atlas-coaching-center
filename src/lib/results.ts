import { supabase } from "@/integrations/supabase/client";

export type StudentResult = {
  id: string;
  rank: number;
  student_name: string;
  score: string;
  year_of_passing: string;
  created_at: string;
};

export async function fetchStudentResults(): Promise<StudentResult[]> {
  const { data, error } = await supabase
    .from("student_results")
    .select("id, rank, student_name, score, year_of_passing, created_at")
    .order("rank", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function updateStudentResult(
  id: string,
  values: Pick<StudentResult, "student_name" | "score" | "year_of_passing">,
): Promise<void> {
  const { error } = await supabase.from("student_results").update(values).eq("id", id);
  if (error) throw error;
}