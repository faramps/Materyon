import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  
  // 🔥 Mutlaka await ile alıyoruz
  const supabase = await createSupabaseReadOnlyClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="text-center pt-20">Giriş yapmanız gerekiyor.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Hesabım</h1>
      <p className="mt-4 text-slate-300">
        Hoş geldin, <span className="font-semibold">{user.email}</span>
      </p>
    </div>
  );
}
