import Link from "next/link";
import ImageGallery from "@/app/components/listing/ImageGallery";
import MapDetail from "@/app/components/listing/MapDetail";
import { getListingWithSeller } from "@/lib/supabase/listings";
import { getCategoryNameById } from "@/lib/supabase/categories";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // URL parametresi
  const { slug } = await params;

  // 🔥 slug-id yapısından ID'yi çöz
  // Örn: "hdpe-granul-makinesi-21c316dc8-b68f-41ca-8288-2d23589f2788"
 const id = slug.slice(-36);
 // SON eleman ID'dir

  console.log("ÇÖZÜLEN ID:", id);

  // 🔥 ilan + satıcı çek
  const result = await getListingWithSeller(id!);

  if (!result) {
    return (
      <div className="text-center py-20 text-slate-300 text-lg">
        İlan bulunamadı.
      </div>
    );
  }

  const { listing, seller } = result;

  // 🔥 Kategori adını çek
  const categoryName =
    listing.category && (await getCategoryNameById(listing.category));

  return (
    <div className="space-y-6">

      {/* 🔥 BREADCRUMB */}
      <nav className="text-sm text-slate-400 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-slate-200 transition">Anasayfa</Link>
        <span>/</span>

        <span className="hover:text-slate-200 transition">
          {categoryName ?? "Kategori"}
        </span>

        <span>/</span>

        <span className="text-slate-200 line-clamp-1">
          {listing.title}
        </span>
      </nav>

      {/* 🔥 BAŞLIK */}
      <h1 className="text-3xl font-bold tracking-tight text-white">
        {listing.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* 🔥 SOL TARAF */}
        <div className="lg:col-span-2 space-y-10">
          <ImageGallery images={listing.images ?? []} />

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Açıklama</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* 🔥 SAĞ TARAF */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-4">İlan Bilgileri</h3>

            <table className="w-full text-sm border-separate border-spacing-y-3">
              <tbody>

                {/* Fiyat */}
                <tr>
                  <td className="text-slate-400 w-1/3">Fiyat</td>
                  <td className="text-emerald-400 font-bold text-lg">
                    {listing.price.toLocaleString("tr-TR")} ₺
                  </td>
                </tr>

                {/* İlan No */}
                <tr>
                  <td className="text-slate-400">İlan No</td>
                  <td className="text-slate-200 font-medium">
                    {listing.id}
                  </td>
                </tr>

                {/* Eklenme */}
                <tr>
                  <td className="text-slate-400">Eklenme</td>
                  <td className="text-slate-200 font-medium">
                    {new Date(listing.created_at).toLocaleDateString("tr-TR")}
                  </td>
                </tr>

                {/* Satıcı */}
                <tr>
                  <td className="text-slate-400">Satıcı</td>
                  <td className="text-slate-200 font-medium">
                    {seller.full_name ?? "-"}
                  </td>
                </tr>

                {/* Telefon */}
                <tr>
                  <td className="text-slate-400">Telefon</td>
                  <td className="text-slate-200 font-medium">
                    {seller.phone ?? "-"}
                  </td>
                </tr>

                {/* Kategori */}
                <tr>
                  <td className="text-slate-400">Kategori</td>
                  <td className="text-slate-200 font-medium">
                    {categoryName ?? "-"}
                  </td>
                </tr>

                {/* Alt kategori (varsa) */}
                {listing.subcategory && (
                  <tr>
                    <td className="text-slate-400">Alt Kategori</td>
                    <td className="text-slate-200 font-medium">
                      {listing.subcategory}
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

            {/* Telefon Et */}
            {seller.phone && (
              <a
                href={`tel:${seller.phone}`}
                className="mt-5 block text-center bg-emerald-600 hover:bg-emerald-700 
                text-white py-2 rounded-lg transition font-medium"
              >
                Telefon Et
              </a>
            )}
          </div>

          {/* 🔥 HARİTA */}
          {listing.location && (
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Konum Haritası
              </h3>
              <MapDetail location={listing.location} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
