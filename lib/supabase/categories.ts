import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function getCategoryNameById(id: string) {
  if (!id) return null;

  // 🔥 Next.js 16 → cookies() artık ASYNC o yüzden await ZORUNLU
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value ?? "";
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return data.name;
}
