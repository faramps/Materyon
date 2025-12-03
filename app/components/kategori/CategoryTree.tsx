"use client";

import { ChevronRight } from "lucide-react";

interface Cat {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export default function CategoryTree({
  categories,
  current,
  chain,
  listingCounts,
}: {
  categories: Cat[];
  current: Cat;
  chain: Cat[];
  listingCounts: Record<number, number>;
}) {
  // seçilen kategorinin sadece alt kategorileri
  const children = categories.filter((c) => c.parent_id === current.id);

  function buildUrl(cat: Cat) {
    const idx = chain.findIndex((x) => x.id === cat.id);
    if (idx === -1) return chain.map((x) => x.slug).join("/") + "/" + cat.slug;
    return chain.slice(0, idx + 1).map((x) => x.slug).join("/");
  }

  return (
    <div className="bg-[#0c0f18] p-5 rounded-xl border border-gray-800 shadow-xl">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Alt Kategoriler
      </h2>

      {children.length === 0 && (
        <p className="text-gray-500 text-sm">Alt kategori bulunamadı.</p>
      )}

      <ul className="space-y-1">
        {children.map((cat) => (
          <li key={cat.id}>
            <a
              href={"/kategori/" + buildUrl(cat)}
              className="flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/40 transition"
            >
              <div className="flex items-center">
                <ChevronRight size={15} className="mr-2" />
                {cat.name}
              </div>

              {/* İLAN SAYISI */}
              <span className="text-xs text-gray-500">
                 {listingCounts[cat.id] ?? 0}
                </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
