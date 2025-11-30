import ImageGallery from "@/app/components/listing/ImageGallery";
import MapDetail from "@/app/components/listing/MapDetail";
import { getListingWithSeller } from "@/lib/supabase/listings";

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await getListingWithSeller(params.id);

  if (!result) {
    return (
      <div className="text-center py-20 text-slate-300">
        İlan bulunamadı.
      </div>
    );
  }

  const { listing, seller } = result;

  return (
    <div className="space-y-10">

      {/* Başlık */}
      <h1 className="text-3xl font-semibold">{listing.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Sol taraf */}
        <div className="space-y-8">

          {/* Görseller */}
          <ImageGallery images={listing.images} />

          {/* Açıklama */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Açıklama</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Sağ taraf (bilgiler) */}
        <div className="space-y-6">

          {/* Fiyat */}
          <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
            <div className="text-sm text-slate-400 mb-1">Fiyat</div>
            <div className="text-3xl font-bold text-emerald-400">
              {listing.price.toLocaleString("tr-TR")} ₺
            </div>
          </div>

          {/* Satıcı */}
          <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl space-y-3">
            <h3 className="text-lg font-semibold">Satıcı Bilgileri</h3>

            <p className="text-sm text-slate-300">
              <span className="font-medium text-slate-100">Ad:</span>{" "}
              {seller.full_name ?? "–"}
            </p>

            <p className="text-sm text-slate-300">
              <span className="font-medium text-slate-100">Telefon:</span>{" "}
              {seller.phone ?? "–"}
            </p>

            <a
              href={`tel:${seller.phone}`}
              className="btn-primary w-full text-center mt-2 block"
            >
              Telefon Et
            </a>
          </div>

          {/* Konum */}
          {listing.location && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Konum</h3>
              <MapDetail location={listing.location} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
