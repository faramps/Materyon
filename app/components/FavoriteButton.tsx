"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function FavoriteButton({ listingId }: { listingId: number }) {
  const [favId, setFavId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("favorites").select("id").eq("user_id", user.id).eq("listing_id", listingId).maybeSingle();
      if (mounted) setFavId(data?.id ?? null);
    };
    load();
    return () => { mounted = false; };
  }, [listingId]);

  const toggleFav = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert("Giriş yapmalısınız."); setLoading(false); return; }

    if (favId) {
      await supabase.from("favorites").delete().eq("id", favId);
      setFavId(null);
    } else {
      const { data, error } = await supabase.from("favorites").insert({ user_id: user.id, listing_id: listingId }).select().single();
      if (error) console.error(error);
      else setFavId(data.id);
    }
    setLoading(false);
  };

  return (
    <button onClick={toggleFav} disabled={loading} className="px-3 py-1 bg-yellow-500 rounded">
      {favId ? "Favoriden Çıkar" : "Favorilere Ekle"}
    </button>
  );
}
