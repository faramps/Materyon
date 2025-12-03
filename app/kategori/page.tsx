import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";
import CategoryTree from "@/app/components/kategori/CategoryTree";
import ListingGrid from "@/app/components/kategori/ListingGrid";

export default async function CategoryMainPage() {
  const supabase = await createSupabaseReadOnlyClient();

  //
  // 1) TÜM KATEGORİLER
  //
  const { data: allCats } = await supabase.from("categories").select("*");
  const categories = allCats ?? [];

  //
  // 2) ANA KATEGORİLER (üst seviye)
  //
  const rootCategories = categories.filter((c) => c.parent_id === null);

  //
  // 3) TÜM İLANLAR
  //
  const { data: allListings } = await supabase.from("listings").select("*");
  const listingsArr = allListings ?? [];

  //
  // 4) ANA KATEGORİLER İÇİN İLAN SAYISI
  //
  const listingCounts: Record<number, number> = {};

  function collectChildren(id: number): number[] {
    const ids = [id];
    function dfs(pid: number) {
      categories
        .filter((x) => x.parent_id === pid)
        .forEach((child) => {
          ids.push(child.id);
          dfs(child.id);
        });
    }
    dfs(id);
    return ids;
  }

  for (const cat of categories) {
    const ids = collectChildren(cat.id);
    listingCounts[cat.id] = listingsArr.filter((l) =>
      ids.includes(l.category)
    ).length;
  }
  
  return (
    

    <div className="w-full flex justify-center bg-gray-900 text-gray-100 py-10">
        
      <div className="w-full max-w-8xl grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 px-6">

        {/* SOL PANEL */}
        <div className="bg-[#0c0f18] p-5 rounded-xl border border-gray-800 shadow-xl">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            Kategoriler
          </h2>

          <ul className="space-y-1">
            {rootCategories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`/kategori/${cat.slug}`}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/40 transition"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-gray-500">
                    {listingCounts[cat.id] ?? 0}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SAĞ PANEL */}
        <div>
          <h1 className="text-4xl font-bold mb-6">Tüm İlanlar</h1>

          <p className="text-gray-400 mb-4 text-sm">
            Toplam {listingsArr.length} ilan listeleniyor
          </p>

          <ListingGrid items={listingsArr} />
        </div>
      </div>
    </div>
  );
}
