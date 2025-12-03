import ListingCard from "./ListingCard";
import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";
import { deleteListing } from "./actions";
import PasswordToast from "./PasswordToast";

import {
  User,
  Phone,
  Mail,
  Building2,
  PackageSearch,
  Plus,
} from "lucide-react";

export default async function AccountPage() {
  const supabase = await createSupabaseReadOnlyClient();

  // Kullanıcı getir
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <div className="text-center pt-20">Giriş yapmanız gerekiyor.</div>;
  }

  // Profil bilgisi
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Kullanıcının ilanları
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen p-10 bg-gray-100 dark:bg-gray-900">
      <PasswordToast />
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hesabım
        </h1>

        {/* İlan ekle butonu */}
            <a
                href="/auth/reset-password"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 
                          text-white px-5 py-2 rounded-lg shadow transition font-medium"
              >
                🔐 Şifre Değiştir
              </a>

              {/* İlan ekle butonu */}
              <a
                href="/ilan/ekle"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 
                          text-white px-5 py-2 rounded-lg shadow transition font-medium"
        >
          <Plus size={18} /> İlan Ekle
        </a>
        
      </div>

      {/* --- Kullanıcı Bilgileri --- */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Kullanıcı Bilgileri
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <ProfileField icon={<User />} label="Ad Soyad" value={profile?.full_name ?? "-"} />
          <ProfileField icon={<Mail />} label="E-Posta" value={user.email} />
          <ProfileField icon={<Phone />} label="Telefon" value={profile?.phone ?? "-"} />
          <ProfileField icon={<Building2 />} label="Firma" value={profile?.company ?? "Belirtilmemiş"} />
        </div>
      </section>
      
      {/* --- İLANLARIM --- */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <PackageSearch /> İlanlarım
        </h2>

        {(!listings || listings.length === 0) && (
          <p className="text-gray-500 dark:text-gray-400">
            Henüz bir ilan eklememişsiniz.
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings?.map((item) => (
            <ListingCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              images={item.images}
              created_at={item.created_at}
              showManageButtons={true}   // 👈 SİL + DÜZENLE aktif
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        {icon} {label}
      </p>
      <p className="font-medium text-gray-900 dark:text-white">
        {value ?? "-"}
      </p>
    </div>
  );
}
