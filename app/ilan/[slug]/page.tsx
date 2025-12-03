import ImageGallery from "@/app/components/listing/ImageGallery";
import MapDetail from "@/app/components/listing/MapDetail";
import ShareButton from "@/app/components/listing/ShareButton";

import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";
import { getCategoryNameById } from "@/lib/supabase/categories";


// ============================================================
//  METADATA DİNAMİK
// ============================================================

export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const supabase = await createSupabaseReadOnlyClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!listing) {
    return {
      title: "İlan bulunamadı",
      description: "Aradığınız ilan bulunamadı.",
    };
  }

  const title = `${listing.title} | Materyon`;

  const description =
    listing.description.length > 150
      ? listing.description.slice(0, 150) + "..."
      : listing.description;

  const ogImage = listing.images?.[0] ?? "/default-og.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/ilan/${listing.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}



// ============================================================
//  SAYFA
// ============================================================

export default async function ListingDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const supabase = await createSupabaseReadOnlyClient();

  // === İLANI ÇEK ===
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!listing) {
    return (
      <div className="text-center py-20 text-slate-300 text-lg">
        İlan bulunamadı.
      </div>
    );
  }

  // === TÜM KATEGORİLERİ ÇEK (breadcrumb için) ===
  const { data: allCategoriesRaw } = await supabase
    .from("categories")
    .select("*");

  const allCategories = allCategoriesRaw ?? [];

  const currentCategory = allCategories.find(
    (c: any) => c.id === listing.category
  );

  function buildChain(cat: any) {
    const chain: any[] = [];
    let cur = cat;

    while (cur) {
      chain.unshift(cur);
      cur = allCategories.find((c: any) => c.id === cur.parent_id);
    }

    return chain;
  }

  const chain = currentCategory ? buildChain(currentCategory) : [];

  // === SATICI BİLGİLERİ ===
  const { data: seller } = await supabase
    .from("profiles")
    .select("id, full_name, phone, company")
    .eq("id", listing.user_id)
    .single();

  // === KATEGORİ ADI ===
  const categoryName =
    listing.category && (await getCategoryNameById(listing.category));



  // ============================================================
  //  RENDER
  // ============================================================

  return (
    <div className="space-y-10">

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 flex items-center gap-2">
        <a href="/" className="hover:text-white">Anasayfa</a>
        {chain.length > 0 && <span>/</span>}

        {chain.map((c, i) => (
          <span key={c.id} className="flex items-center gap-2">
            <a
              href={"/kategori/" + chain.slice(0, i + 1).map(q => q.slug).join("/")}
              className="hover:text-white"
            >
              {c.name}
            </a>
            {i < chain.length - 1 && <span>/</span>}
          </span>
        ))}
      </nav>

      {/* Başlık */}
      <h1 className="text-3xl font-bold text-white">{listing.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* SOL TARAF — GÖRSELLER + AÇIKLAMA */}
        <div className="lg:col-span-2 space-y-6">
          <ImageGallery images={listing.images ?? []} />

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-3">
            <h2 className="text-xl font-semibold text-white">Açıklama</h2>
            <p className="text-slate-300 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>


        {/* SAĞ TARAF — İLAN BİLGİLERİ */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-3">
            <h3 className="text-lg font-semibold text-white">İlan Bilgileri</h3>

            <table className="w-full text-sm border-separate border-spacing-y-3">
              <tbody>

                {/* Satıcı adı */}
                {seller?.full_name && (
                  <tr>
                    <td className="text-slate-400 w-1/3">Satıcı</td>
                    <td className="text-slate-200 font-medium">{seller.full_name}</td>
                  </tr>
                )}

                {/* Firma adı (opsiyonel) */}
                {seller?.company && (
                  <tr>
                    <td className="text-slate-400">Firma</td>
                    <td className="text-slate-200">{seller.company}</td>
                  </tr>
                )}

                {/* Fiyat */}
                <tr>
                  <td className="text-slate-400 w-1/3">Fiyat</td>
                  <td className="text-emerald-400 font-bold text-lg">
                    {listing.price.toLocaleString("tr-TR")} ₺
                  </td>
                </tr>

                {/* Kategori */}
                <tr>
                  <td className="text-slate-400">Kategori</td>
                  <td className="text-slate-200">{categoryName ?? "-"}</td>
                </tr>

                {/* Tarih */}
                <tr>
                  <td className="text-slate-400">Tarih</td>
                  <td className="text-slate-200">
                    {new Date(listing.created_at).toLocaleDateString("tr-TR")}
                  </td>
                </tr>

                {/* Konum */}
                <tr>
                  <td className="text-slate-400">Konum</td>
                  <td className="text-slate-200">
                    {listing.city ?? "-"} / {listing.district ?? "-"}
                  </td>
                </tr>

                {/* Telefon */}
                {seller?.phone && (
                  <tr>
                    <td colSpan={2}>
                      <a
                        href={`tel:${seller.phone}`}
                        className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition font-medium mt-2"
                      >
                        📞 Telefon Et
                      </a>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

            <ShareButton title={listing.title} />
          </div>


          {/* Konum */}
          {listing.location && (
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-3">
              <h3 className="text-lg font-semibold text-white">Konum</h3>
              <MapDetail location={listing.location} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
