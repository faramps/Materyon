"use client";

import { useState } from "react";
import CategorySelector from "./CategorySelector";
import ImageUploader from "./ImageUploader";
import MapPicker from "./MapPicker";
import { createListing } from "@/app/ilan/ekle/actions";
import { FiSend, FiMapPin, FiImage, FiTag } from "react-icons/fi";
import { Loader2 } from "lucide-react";

export default function ListingForm() {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // 🔥 ANINDA KİTLER
  const [paths, setPaths] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [category, setCategory] = useState("");

  function validate(form: HTMLFormElement) {
    const formData = new FormData(form);
    const e: Record<string, string> = {};

    if (!formData.get("title")?.toString().trim()) e.title = "Başlık zorunlu.";
    if (!formData.get("description")?.toString().trim())
      e.description = "Açıklama zorunlu.";
    if (!formData.get("price")) e.price = "Fiyat zorunlu.";
    if (!category) e.category = "Kategori seçmelisin.";
    if (!location) e.location = "Konum seçmelisin.";
    if (paths.length === 0) e.paths = "En az 1 fotoğraf yüklemelisin.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmitClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ❗ Artık submit kontrol tamamen bizde

    if (!validate(e.currentTarget)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 🔥 ANLIK BUTON KİTLENİR
    setSubmitted(true);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("location", JSON.stringify(location));
    formData.append("uploaded_paths", JSON.stringify(paths));
    formData.append("category_final", category);

    const res = await createListing(formData);

    if (res.error) {
      alert(res.error);
      setLoading(false);
      setSubmitted(false); // hata olursa aç
    } else {
      window.location.href = `/ilan/basarili?slug=${res.slug}`;




    }
  }

  return (
    <div className="relative">

      {(uploading || loading || submitted) && (
        <div className="fixed top-0 left-0 w-full h-[3px] bg-blue-500 animate-pulse z-50" />
      )}

      <form
        onSubmit={handleSubmitClient} // 🔥 ARTIK BURADAN YÖNETİYORUZ
        className="max-w-3xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl space-y-10 border border-slate-200 dark:border-slate-700"
      >
        {/* BAŞLIKLAR */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">İlan Oluştur</h1>
          <p className="text-slate-500 text-sm">Lütfen Tüm  Bilgileri doldurunuz.</p>
        </div>

        {/* BAŞLIK */}
        <div className="space-y-2">
          <label className="font-medium flex items-center gap-2">
            <FiTag /> İlan Başlığı *
          </label>
          <input
            name="title"
            className="w-full border p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* AÇIKLAMA */}
        <div className="space-y-2">
          <label className="font-medium flex items-center gap-2">
            <FiTag /> Açıklama *
          </label>
          <textarea
            name="description"
            className="w-full border p-3 rounded-lg bg-slate-50 dark:bg-slate-800 h-32"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* FİYAT */}
        <div className="space-y-2">
          <label className="font-medium">Fiyat (₺) *</label>
          <input
            type="number"
            name="price"
            className="w-full border p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* KATEGORİ */}
        <div className="space-y-2">
          <label className="font-medium flex items-center gap-2">
            <FiTag /> Kategori *
          </label>
          <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800">
            <CategorySelector onSelect={setCategory} />
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* FOTOĞRAF */}
        <div className="space-y-2">
          <label className="font-medium flex items-center gap-2">
            <FiImage /> Fotoğraflar *
          </label>
          <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800">
            <ImageUploader onPaths={setPaths} onUploading={setUploading} />
          </div>
          {errors.paths && (
            <p className="text-red-500 text-sm">{errors.paths}</p>
          )}
        </div>

        {/* KONUM */}
        <div className="space-y-2">
          <label className="font-medium flex items-center gap-2">
            <FiMapPin /> Konum Seç *
          </label>
          <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800">
            <MapPicker onSelectLocation={setLocation} />
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        {/* YAYINLA */}
        <button
          type="submit"
          disabled={loading || uploading || submitted}
          className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading || uploading || submitted ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              İşlem yapılıyor...
            </>
          ) : (
            <>
              <FiSend />
              İlanı Yayınla
            </>
          )}
        </button>
      </form>
    </div>
  );
}
