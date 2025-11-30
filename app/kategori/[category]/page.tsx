import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const supabase = await createSupabaseReadOnlyClient();
  const { category: slug } = await params;

  // 1) ROOT kategori (slug ile)
  const { data: root } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!root) return <div>Kategori bulunamadı.</div>;

  // 2) ROOT'un alt kategorileri
  const { data: children } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("parent_id", root.id);

  const level1 = children ?? [];

  // 3) HER bir child'ın alt kategorileri
  const { data: level2 } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id")
    .in("parent_id", level1.map((c) => c.id));

  const subCats = level2 ?? [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{root.name}</h1>

      {level1.length === 0 && <p>Bu kategoride alt kategori yok.</p>}

      <div className="space-y-3">
        {level1.map((cat) => (
          <div key={cat.id}>
            <a
              href={`/kategori/${root.slug}/${cat.slug}`}
              className="text-sky-400 underline text-lg"
            >
              {cat.name}
            </a>

            <div className="ml-4 mt-1 space-y-1">
              {subCats
                .filter((s) => s.parent_id === cat.id)
                .map((sub) => (
                  <a
                    key={sub.id}
                    href={`/kategori/${root.slug}/${sub.slug}`}
                    className="text-sky-300 underline text-sm block"
                  >
                    • {sub.name}
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
