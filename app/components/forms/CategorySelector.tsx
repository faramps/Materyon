"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}

type Props = {
  onSelect?: (id: string) => void;
};

export default function CategorySelector({ onSelect }: Props) {
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

    if (!data || data.length === 0) return;

    setLevels((prev) => {
      const next = [...prev];
      next[levelIndex] = data;
      return next.slice(0, levelIndex + 1);
    });

    setSelected((prev) => prev.slice(0, levelIndex));
  }

  async function handleSelect(levelIndex: number, id: string) {
    setSelected((prev) => {
      const next = [...prev];
      next[levelIndex] = id;
      return next;
    });

    if (onSelect) onSelect(id);

    await loadLevel(id, levelIndex + 1);
  }

  const finalCategory = selected[selected.length - 1] || "";

  return (
    <div className="space-y-4">
      <input type="hidden" name="category_final" value={finalCategory} />

      {levels.map((categories, index) => (
        <select
          key={index}
          className="
            w-full bg-slate-900/60 border border-white/10 text-slate-200
            rounded-lg px-4 py-3 outline-none 
            focus:ring-2 focus:ring-sky-500/50 transition
          "
          value={selected[index] || ""}
          onChange={(e) => handleSelect(index, e.target.value)}
        >
          <option className="text-slate-400" value="">
            {index === 0 ? "Ana kategori seç" : "Alt kategori seç"}
          </option>

          {categories.map((c) => (
            <option className="bg-slate-900 text-slate-200" key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
