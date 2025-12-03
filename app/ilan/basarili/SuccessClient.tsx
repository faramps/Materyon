"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Send } from "lucide-react";

export default function SuccessClient({ listing, cover, url }: any) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-gray-700 p-8 rounded-2xl max-w-lg w-full text-center shadow-2xl"
      >
        <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          İlan başarıyla yayınlandı!
        </h1>

        <p className="text-gray-400 mb-6">
          Aşağıda ilan özetini görebilirsin.
        </p>

        {/* KAPAK FOTOGRAFİ */}
        {cover && (
          <img
            src={cover}
            className="w-full h-52 object-cover rounded-xl mb-6 border border-gray-700"
          />
        )}

        {/* BAŞLIK & FİYAT */}
        <div className="text-left space-y-2 mb-6">
          <p className="text-lg font-semibold">{listing.title}</p>
          <p className="text-gray-300">
            Fiyat:{" "}
            <span className="text-green-400 font-bold">
              {listing.price.toLocaleString()}₺
            </span>
          </p>

          {listing.city && listing.district && (
            <p className="text-gray-400">
              Konum: {listing.city} / {listing.district}
            </p>
          )}
        </div>

        {/* İLANI GÖR */}
        <Link
          href={`/ilan/${listing.slug}`}
          className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
        >
          <Send size={18} />
          İlanı Görüntüle
        </Link>
      </motion.div>
    </div>
  );
}
