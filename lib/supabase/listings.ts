"use server";

import "server-only";
import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

// ---------------------------
// TYPES
// ---------------------------

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  images: string[];
  location: { lat: number; lng: number };
  created_at: string;
  user_id: string;
  slug: string; // 🔥 SLUG EKLENDİ
};

export type Seller = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

// ---------------------------
// GET LISTING + SELLER
// ---------------------------

export async function getListingWithSeller(id: string) {
  const supabase = await createSupabaseReadOnlyClient();

  // 🔥 İlanı çek
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !listing) return null;

  // 🔥 Satıcı bilgisi
  const { data: seller } = await supabase
    .from("profiles")
    .select("id, full_name, phone")
    .eq("id", listing.user_id)
    .single();

  return {
    listing: listing as Listing,
    seller: seller as Seller,
  };
}
