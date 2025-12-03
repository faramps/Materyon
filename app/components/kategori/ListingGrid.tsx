interface Item {
  id: string;
  title: string;
  price: number;
  images?: string[];
  slug: string;
  city?: string | null;
  district?: string | null;
  created_at?: string;
}

export default function ListingGrid({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className="text-gray-400">Bu kategoride ilan yok.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <a
          key={item.id}
          href={`/ilan/${item.slug}`}
          className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-750 hover:shadow-xl hover:shadow-black/40 transition-all duration-200"
        >
          {/* FOTOĞRAF */}
          <div className="w-full sm:w-40 h-32 rounded-lg overflow-hidden bg-gray-700 shadow-inner">
            {item.images?.[0] ? (
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            ) : (
              <div className="text-gray-400 flex items-center justify-center h-full">
                Fotoğraf yok
              </div>
            )}
          </div>

          {/* ORTA ALAN */}
          <div className="flex-1 w-full space-y-2">
            {/* Başlık */}
            <h2 className="text-xl font-semibold text-white line-clamp-1 group-hover:text-sky-300 transition">
              {item.title}
            </h2>

            {/* Konum */}
            {item.city && item.district && (
              <span className="inline-block bg-slate-700 text-gray-200 text-xs px-3 py-1 rounded-full">
                📍 {item.city} / {item.district}
              </span>
            )}
          </div>

          {/* SAĞ BİLGİ BLOĞU */}
          <div className="flex flex-col items-end min-w-[120px]">
            {/* Fiyat */}
            <span className="text-sky-400 font-bold text-2xl">
              {item.price.toLocaleString("tr-TR")} TL
            </span>

            {/* Tarih */}
            {item.created_at && (
              <span className="text-gray-400 text-xs mt-1">
                {new Date(item.created_at).toLocaleDateString("tr-TR")}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
