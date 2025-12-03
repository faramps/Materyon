"use server";

import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";
import SuccessClient from "./SuccessClient";

export default async function Page(props: { searchParams: Promise<any> }) {
  const search = await props.searchParams;   // 🔥 Promise çözülüyor
  const slug = search.slug;

  console.log("🔥 Success slug:", slug); // Debug

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Geçersiz bağlantı.
      </div>
    );
  }

  const supabase = await createSupabaseReadOnlyClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        İlan bulunamadı.
      </div>
    );
  }

  const cover = listing.images?.[0] ?? null;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/ilan/${listing.slug}`;

  return <SuccessClient listing={listing} cover={cover} url={url} />;
}
