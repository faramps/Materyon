"use client";

import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";

export default function ImageUploader({
  onPaths,
  onUploading,
}: {
  onPaths: (paths: string[]) => void;
  onUploading: (state: boolean) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const hiddenInputsRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "image/dng",
    "image/x-adobe-dng",
  ];

  // ---------------------------------------------------
  // Hidden input üretme (FormData için zorunlu)
  // ---------------------------------------------------
  function syncHiddenInputs(updatedFiles: File[]) {
    if (!hiddenInputsRef.current) return;
    hiddenInputsRef.current.innerHTML = "";

    updatedFiles.forEach((file) => {
      const dt = new DataTransfer();
      dt.items.add(file);

      const input = document.createElement("input");
      input.type = "file";
      input.name = "images";
      input.files = dt.files;
      input.hidden = true;
      hiddenInputsRef.current!.appendChild(input);
    });
  }

  // ---------------------------------------------------
  // Fotoğraf seçme
  // ---------------------------------------------------
  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);

    // MIME doğrulaması
    for (const file of selected) {
      if (!allowedTypes.includes(file.type)) {
        setError("Sadece görüntü dosyaları yükleyebilirsiniz.");
        return;
      }
    }

    // Max 8 sınır
    if (selected.length + files.length > 8) {
      setError("En fazla 8 fotoğraf yükleyebilirsiniz.");
      return;
    }

    setError(null);

    const updated = [...files, ...selected];
    setFiles(updated);
    syncHiddenInputs(updated);

    uploadAll(updated); // 📌 Fotoğrafları otomatik sunucuya yükle
  }

  // ---------------------------------------------------
  // FOTOĞRAFLARI SUNUCUYA YÜKLE
  // ---------------------------------------------------
  async function uploadAll(selectedFiles: File[]) {
    onUploading(true);
    setProgress(0);

    const uploaded: string[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.url) uploaded.push(data.url);

      setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
    }

    setUploadedUrls(uploaded);
    onPaths(uploaded);
    onUploading(false);
  }

  // ---------------------------------------------------
  // Silme
  // ---------------------------------------------------
  function removeImage(index: number) {
    const updated = files.filter((_, i) => i !== index);
    const updatedURLs = uploadedUrls.filter((_, i) => i !== index);

    setFiles(updated);
    setUploadedUrls(updatedURLs);

    syncHiddenInputs(updated);
    onPaths(updatedURLs);
  }

  // ---------------------------------------------------
  // Kapak belirleme
  // ---------------------------------------------------
  function setCover(index: number) {
    if (index === 0) return;

    const arr = [...files];
    const urlArr = [...uploadedUrls];

    const movedFile = arr.splice(index, 1)[0];
    const movedURL = urlArr.splice(index, 1)[0];

    arr.unshift(movedFile);
    urlArr.unshift(movedURL);

    setFiles(arr);
    setUploadedUrls(urlArr);

    syncHiddenInputs(arr);
    onPaths(urlArr);
  }

  // ---------------------------------------------------
  // Drag-drop
  // ---------------------------------------------------
  useEffect(() => {
    if (!listRef.current) return;

    Sortable.create(listRef.current, {
      animation: 150,
      onEnd: (evt: any) => {
        const oldIndex = evt.oldIndex ?? 0;
        const newIndex = evt.newIndex ?? 0;

        const arr = [...files];
        const urls = [...uploadedUrls];

        const moved = arr.splice(oldIndex, 1)[0];
        const movedURL = urls.splice(oldIndex, 1)[0];

        arr.splice(newIndex, 0, moved);
        urls.splice(newIndex, 0, movedURL);

        setFiles(arr);
        setUploadedUrls(urls);

        syncHiddenInputs(arr);
        onPaths(urls);
      },
    });
  }, [files, uploadedUrls]);

  return (
    <div className="border-2 border-dashed p-6 rounded text-center space-y-4">

      <div ref={hiddenInputsRef}></div>

      <label className="cursor-pointer font-medium text-blue-600">
        Fotoğraf Yükle
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.dng"
          multiple
          className="hidden"
          onChange={handleSelect}
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* YÜKLEME BARA */}
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* RESİMLER */}
      {files.length > 0 && (
        <div ref={listRef} className="grid grid-cols-3 gap-4 mt-4 select-none">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group border rounded overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-24 object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

              <button
                type="button"
                onClick={() => setCover(index)}
                className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded ${
                  index === 0
                    ? "bg-yellow-500 text-black"
                    : "bg-black/60 text-white opacity-0 group-hover:opacity-100"
                } transition`}
              >
                {index === 0 ? "Kapak" : "Kapak Yap"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
