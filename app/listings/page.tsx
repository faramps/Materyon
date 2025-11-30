"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  price: number | null;
  created_at: string;
};

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    supabase
      .from("listings")
      .select("id,title,price,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setListings((data ?? []) as Listing[]);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">İlanlar</h1>

      <div className="grid gap-4">
        {listings.map((l) => (
          <div key={l.id} className="p-4 bg-white/5 border">
            <h2 className="font-semibold">{l.title}</h2>
            <p>Fiyat: {l.price ?? "Görüşülecek"}</p>
            <p className="text-xs text-gray-300">
              {new Date(l.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
