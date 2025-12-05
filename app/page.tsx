import { Contact } from "lucide-react";
import InteractiveSplitSection from "../components/InteractiveSplitSection";
import FeedbackForm from "./components/ContactSection";
import ContactSection from "./components/ContactSection";

export const metadata = {
  title: "Materyon – Endüstriyel Makine & Hammadde Pazarı",
  description:
    "Türkiye'nin endüstriyel makine ve hammadde ilan platformu.",
};

function generateHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Materyon",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  };
}

export default function HomePage() {
  const jsonLd = generateHomeJsonLd();

  return (
    <div className="w-full relative">

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <InteractiveSplitSection />

      {/* HAKKIMIZDA */}
      <section id="hakkimizda" className="max-w-8xl mx-auto px-6 py-24 animate-fadeInUp">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Hakkımızda</h2>
        <p className="text-xl text-slate-300 leading-relaxed max-w-5xl">
          Materyon; endüstriyel makine ve hammadde sektörünü tek bir çatı altında
          buluşturan modern bir ticaret platformudur.
        </p>
      </section>

      {/* VİZYON */}
      <section id="vizyonumuz" className="max-w-8xl mx-auto px-6 py-24">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-20">
          Vizyonumuz
        </h2>

        <div className="grid md:grid-cols-3 gap-14">
          {[
            { title: "Dijital Dönüşüm", text: "Sanayi sektörünü dijitalleştirmek." },
            { title: "Güvenilir Ekosistem", text: "Şeffaf ticaret." },
            { title: "Küresel Sanayi Ağı", text: "Global ölçekli pazar." },
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-lg text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MİSYON */}
      <section id="misyonumuz" className="max-w-8xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Misyonumuz</h2>
        <p className="text-lg text-slate-300 max-w-5xl leading-relaxed">
          Türkiye’nin üretim gücünü dijital dünyada görünür kılmak.
        </p>
      </section>

      {/* GERİ BİLDİRİM */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-center text-4xl font-extrabold mb-10">
          Görüş ve Önerileriniz
        </h2>

        <ContactSection/>
      </section>
    </div>
  );
}
