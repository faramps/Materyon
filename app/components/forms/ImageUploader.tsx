"use client";

import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { supabase } from "@/lib/supabase/client";

type Props = {
  onPaths: (paths: string[]) => void;
  onUploading: (uploading: boolean) => void;
};

interface ImageItem {
  id: string;
  file: File;
  rawPath: string | null;
}

export default function ImageUploader({ onPaths, onUploading }: Props) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const sortableRef = useRef<HTMLDivElement | null>(null);

  const allowedFormats = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "image/dng",
  ];

  // -------------------------------------------------
  // 📌 FORM SUBMIT ENGELLEYİCİ
  // -------------------------------------------------
  function block(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  // -------------------------------------------------
  // 📌 FOTOĞRAF SEÇME
  // -------------------------------------------------
  async function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    event.stopPropagation(); // 🔥 root block’tan kaçır
    event.preventDefault();

    const selected = Array.from(event.target.files || []);
    if (selected.length === 0) return;

    for (const file of selected) {
      if (!allowedFormats.includes(file.type)) {
        setError("Bu dosya formatı desteklenmiyor.");
        return;
      }
    }

    if (items.length + selected.length > 8) {
      setError("En fazla 8 fotoğraf yükleyebilirsin.");
      return;
    }

    setError(null);

    const newItems: ImageItem[] = selected.map((file) => ({
      id: crypto.randomUUID(),
      file,
      rawPath: null,
    }));

    const updated = [...items, ...newItems];
    setItems(updated);

    await uploadRawFiles(updated);
  }

  // -------------------------------------------------
  // 📌 RAW Dosya Upload
  // -------------------------------------------------
  async function uploadRawFiles(fileItems: ImageItem[]) {
    onUploading(true);
    setProgress(0);

    const newPaths: string[] = [];

    for (let i = 0; i < fileItems.length; i++) {
      const item = fileItems[i];

      if (item.rawPath) {
        newPaths.push(item.rawPath);
        continue;
      }

      const file = item.file;
      const rawPath = `raw/${Date.now()}-${i}-${file.name}`;

      const { error } = await supabase.storage
        .from("listings")
        .upload(rawPath, file, {
          contentType: file.type,
        });

      if (!error) {
        newPaths.push(rawPath);
        fileItems[i].rawPath = rawPath;
      }

      setProgress(Math.round(((i + 1) / fileItems.length) * 100));
    }

    setItems([...fileItems]);
    onPaths(newPaths);
    onUploading(false);
  }

  // -------------------------------------------------
  // 📌 GÖRSEL SİL
  // -------------------------------------------------
  function removeImage(index: number) {
    const updated = [...items];
    updated.splice(index, 1);

    setItems(updated);
    onPaths(updated.map((i) => i.rawPath!).filter(Boolean));
  }

  // -------------------------------------------------
  // 📌 KAPAK YAP
  // -------------------------------------------------
  function makeCover(index: number) {
    const updated = [...items];
    const cover = updated.splice(index, 1)[0];
    updated.unshift(cover);

    setItems(updated);
    onPaths(updated.map((i) => i.rawPath!).filter(Boolean));
  }

  // -------------------------------------------------
  // 📌 Drag & Drop
  // -------------------------------------------------
  useEffect(() => {
    if (!sortableRef.current) return;

    Sortable.create(sortableRef.current, {
      animation: 150,
      onEnd: (evt) => {
        const updated = [...items];
        const moved = updated.splice(evt.oldIndex!, 1)[0];
        updated.splice(evt.newIndex!, 0, moved);

        setItems(updated);
        onPaths(updated.map((i) => i.rawPath!).filter(Boolean));
      },
    });
  }, [items]);

  return (
    <div
      className="border-2 border-dashed rounded-lg p-5 space-y-4 text-center"
      onClick={block}
      onMouseDown={block}
      onMouseUp={block}
      onKeyDown={block}
      onSubmit={block}
    >
      {/* Foto seçme */}
      <label
        className="cursor-pointer text-blue-600 font-medium"
        onClick={(e) => e.stopPropagation()} // 🔥 input’u koruyor
        onMouseDown={(e) => e.stopPropagation()}
      >
        Fotoğraf Yükle
        <input
          type="file"
          multiple
          accept={allowedFormats.join(",")}
          className="hidden"
          onChange={handleSelect}
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Yükleme Barı */}
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-300 h-2 rounded overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Ön İzleme */}
      {items.length > 0 && (
        <div ref={sortableRef} className="grid grid-cols-3 gap-3 mt-4 select-none">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="relative group border rounded overflow-hidden sortable-item"
            >
              <img
                src={URL.createObjectURL(item.file)}
                className="w-full h-24 object-cover pointer-events-none"
              />

              {/* Sil */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(i);
                }}
                className="absolute top-1 right-1 bg-black/60 text-white px-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

              {/* Kapak Yap */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  makeCover(i);
                }}
                className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded ${
                  i === 0
                    ? "bg-yellow-400 text-black"
                    : "bg-black/60 text-white opacity-0 group-hover:opacity-100"
                }`}
              >
                {i === 0 ? "Kapak" : "Kapak Yap"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
