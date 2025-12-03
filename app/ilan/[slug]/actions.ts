"use server";

import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

export async function getListingWithSeller(id: string) {
  const supabase = await createSupabaseReadOnlyClient();

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !listing) return null;

  const { data: seller } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", listing.user_id)
    .single();

  return { listing, seller };
}
