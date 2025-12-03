"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server";

export async function deleteListing(id: string) {
  const supabase = await createSupabaseServerActionClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapılmadı." };

  // 🔥 Silme işlemi
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: "Silme başarısız: " + error.message };

  return { success: true };
}
