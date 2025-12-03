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
  slug: string;
};

export type Seller = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

// ---------------------------
// GET LISTING + SELLER (SLUG İLE)
// ---------------------------

export async function getListingWithSellerBySlug(slug: string) {
  const supabase = await createSupabaseReadOnlyClient();

  // 🔥 Slug ile ilanı çek
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!listing) return null;

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
// ---------------------------
