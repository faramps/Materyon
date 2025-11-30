"use client";

import { useState } from "react";
import CategorySelector from "./CategorySelector";
import ImageUploader from "./ImageUploader";
import MapPicker from "./MapPicker";
import { createListing } from "@/app/ilan/ekle/actions";

export default function ListingForm() {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);

  async function handleSubmit(formData: FormData) {
    if (paths.length === 0) {
      alert("Lütfen en az 1 fotoğraf yükleyin.");
      return;
    }

    setLoading(true);

    formData.append("location", JSON.stringify(location));
    formData.append("uploaded_paths", JSON.stringify(paths));

    const res = await createListing(formData);

    setLoading(false);

    if (res.error) alert(res.error);
    else alert("İlan başarıyla eklendi!");
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-6"
    >
      <h1 className="text-3xl font-bold">İlan Ekle</h1>

      <input
        name="title"
        required
        placeholder="İlan başlığı"
        className="w-full border p-3 rounded"
      />

      <textarea
        name="description"
        required
        placeholder="Açıklama"
        className="w-full border p-3 rounded h-28"
      />

      <input
        name="price"
        type="number"
        required
        placeholder="₺ Fiyat"
        className="w-full border p-3 rounded"
      />

      <CategorySelector />

      <ImageUploader
        onPaths={(paths) => setPaths(paths)}
        onUploading={(state) => setUploading(state)}
      />

      <MapPicker onSelectLocation={(loc) => setLocation(loc)} />

      <button
        disabled={loading || uploading}
        className="w-full p-3 bg-black text-white rounded font-bold disabled:opacity-50"
      >
        {uploading
          ? "Fotoğraflar yükleniyor..."
          : loading
          ? "Kaydediliyor..."
          : "Yayınla"}
      </button>
    </form>
  );
}
