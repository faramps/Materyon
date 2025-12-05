"use client";

import { useState } from "react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Gönderim hatası");

      setSuccess("Mesajınız başarıyla gönderildi ✅");
      e.currentTarget.reset();
    } catch (err) {
      setError("Mesaj gönderilemedi ❌ Lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="w-full py-28 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* SOL TARAF – METİN */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Bizimle İletişime Geç
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Materyon üzerinden hammadde, makine ve tüm iş birlikleriyle ilgili
            sorularını bize iletebilirsin. Sana en kısa sürede dönüş yaparız.
          </p>

          <div className="space-y-3 text-gray-300">
            <p>📩 contact@materyon.com</p>
            <p>🌍 Türkiye Geneli Hizmet</p>
            <p>🕘 Hafta içi 09:00 – 18:00</p>
          </div>
        </div>

        {/* SAĞ TARAF – FORM */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              name="name"
              required
              placeholder="Ad Soyad"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="E-posta"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30"
            />

            <textarea
              name="message"
              required
              placeholder="Mesajınız"
              className="w-full min-h-[140px] bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none resize-none focus:border-white/30"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Gönderiliyor..." : "Gönder"}
            </button>

            {/* DURUM MESAJLARI */}
            {success && (
              <p className="text-green-400 text-sm text-center">{success}</p>
            )}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
