"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server";

export async function deleteListing(listingId: string) {
  const supabase = await createSupabaseServerActionClient();

  // Kullanıcı doğrulaması
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "yetki yok" };

  // Sadece kendi ilanını silebilir
  await supabase
    .from("listings")
    .delete()
    .eq("id", listingId)
    .eq("user_id", user.id);

  return { success: true };
}
