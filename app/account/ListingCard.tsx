"use client";

import Image from "next/image";
import DeleteConfirm from "@/app/components/ui/DeleteConfirm";
import { Trash2, Pencil } from "lucide-react";
import { useTransition, useState } from "react";
import { deleteListing } from "@/app/account/actions";

export default function ListingCard({
  id,
  title,
  price,
  images,
  created_at,
  showManageButtons = false,
}: {
  id: string;
  title: string;
  price: number;
  images: string[];
  created_at: string;
  showManageButtons?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false); // 🔥 Modal state

  function handleDelete() {
    startTransition(async () => {
      await deleteListing(id);
      window.location.reload();
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 hover:shadow-xl transition">
      {/* Fotoğraf */}
      <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={images?.[0] ?? "/no-image.png"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Başlık */}
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Fiyat */}
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        {price.toLocaleString("tr-TR")} TL
      </p>

      <div className="text-xs text-gray-400 mt-1">
        {new Date(created_at).toLocaleDateString("tr-TR")}
      </div>

      {/* Yönetim Alanı */}
      {showManageButtons && (
        <div className="mt-4 flex items-center gap-2">
                <a
                    href={`/ilan/${id}`}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                    Detaya Git
                </a>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                    <Trash2 size={16} />
                </button>

                <DeleteConfirm
                    open={open}
                    onConfirm={handleDelete}
                    onCancel={() => setOpen(false)}
                />
                </div>

      )}
    </div>
  );
}
