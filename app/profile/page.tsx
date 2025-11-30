import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Profil</h1>
      <p className="mt-3">E-mail: {user?.email}</p>

      <form action="/logout" method="post" className="mt-6">
        <button className="bg-red-500 text-white p-2">
          Çıkış Yap
        </button>
      </form>
    </div>
  );
}
