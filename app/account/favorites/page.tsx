import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function FavoritesPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div className="p-6">Giriş yapmalısın.</div>;

  const { data } = await supabase
    .from("favorites")
    .select("id, created_at, listings (id, title, price)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Favorilerim</h1>
      <div className="mt-4 grid gap-4">
        {data?.map((f: any) => (
          <div key={f.id} className="p-4 border rounded bg-white/5">
            <h3 className="font-semibold">{f.listings?.title}</h3>
            <p>Fiyat: {f.listings?.price ?? "Görüşülecek"}</p>
          </div>
        ))}

        {!data?.length && <p className="text-sm text-gray-400">Henüz favorin yok.</p>}
      </div>
    </div>
  );
}
