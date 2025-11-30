import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; sub: string }>;
}) {
  const supabase = await createSupabaseReadOnlyClient();
  const { sub } = await params;

  // 1) ALT kategori bul
  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", sub)
    .single();

  if (!category) return <div>Kategori bulunamadı.</div>;

  // 2) Bu kategorinin çocukları
  const { data: children } = await supabase
    .from("categories")
    .select("id, parent_id, slug")
    .eq("parent_id", category.id);

  const childIds = children?.map((c) => c.id) ?? [];

  // 3) Bu kategori + alt kategoriler birlikte filtre edilir
  const filterIds = [category.id, ...childIds];

  // 4) İLANLAR → category_final (senin final seçimin)
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .in("category", filterIds);

  const items = listings ?? [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>

      {items.length === 0 && <p>Bu kategoride ilan bulunamadı.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`/ilan/${item.slug}-${item.id}`}
            className="glass-panel p-4 rounded-xl block hover:bg-white/10 transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm opacity-70 line-clamp-2">
              {item.description}
            </p>
            <p className="mt-2 font-bold">{item.price} TL</p>
          </a>
        ))}
      </div>
    </div>
  );
}
