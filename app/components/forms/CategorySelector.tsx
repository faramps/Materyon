"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}

export default function CategorySelector() {
  const [levels, setLevels] = useState<Category[][]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    loadLevel(null, 0);
  }, []);

  async function loadLevel(parentId: string | null, levelIndex: number) {
    let query = supabase.from("categories").select("*");

    if (parentId === null) query = query.is("parent_id", null);
    else query = query.eq("parent_id", parentId);

    const { data } = await query;

    // ❗ Eğer bu seviyede hiç kategori yoksa (alt kategori yoksa) → dropdown ekleme
    if (!data || data.length === 0) {
      return; // BURASI SORUNU ÇÖZÜYOR
    }

    // Seviye ekle
    setLevels((prev) => {
      const next = [...prev];
      next[levelIndex] = data;
      return next.slice(0, levelIndex + 1);
    });

    // Bu seviyeden sonraki seçimleri sil
    setSelected((prev) => prev.slice(0, levelIndex));
  }

  async function handleSelect(levelIndex: number, id: string) {
    // Seçilen kategori güncelle
    setSelected((prev) => {
      const next = [...prev];
      next[levelIndex] = id;
      return next;
    });

    // Bir alt seviyeyi yüklemeye çalış
    await loadLevel(id, levelIndex + 1);
  }

  const finalCategory = selected[selected.length - 1] || "";

  return (
    <div className="space-y-4">
      <input type="hidden" name="category_final" value={finalCategory} />

      {levels.map((categories, index) => (
        <select
          key={index}
          className="w-full border p-3 rounded"
          value={selected[index] || ""}
          onChange={(e) => handleSelect(index, e.target.value)}
        >
          <option value="">
            {index === 0 ? "Ana kategori seç" : "Alt kategori seç"}
          </option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
