"use client";
import InteractiveSplitSection from "../components/InteractiveSplitSection";

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

      {/* =============================== */}
      {/* 🏭 HAKKIMIZDA */}
      {/* =============================== */}
      <section id="hakkimizda" className="max-w-8xl mx-auto px-6 py-24 animate-fadeInUp">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 flex items-center gap-3">
          
          Hakkımızda
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed max-w-5xl">
          Materyon; endüstriyel makine ve hammadde sektörünü tek bir çatı altında
          buluşturan modern bir ticaret platformudur. Üreticiler, alıcılar ve satıcılar
          için şeffaf, hızlı ve güçlü bir etkileşim alanı sağlar.
        </p>
      </section>

      {/* =============================== */}
      {/* 🔷 VİZYON */}
      {/* =============================== */}
      <section id="vizyonumuz" className="max-w-8xl mx-auto px-6 py-24">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-20">
          Vizyonumuz
        </h2>

        <div className="grid md:grid-cols-3 gap-14">

          {[
            {
              title: "Dijital Dönüşüm",
              text:
                "Sanayi sektörünü modern bir dijital ticaret altyapısıyla buluşturarak üretim ekonomisinin verimliliğini artırmak.",
            },
            {
              title: "Güvenilir Ekosistem",
              text:
                "Alıcı ve satıcı etkileşimlerini şeffaf hale getirerek güven odaklı bir endüstriyel pazar oluşturmak.",
            },
            {
              title: "Küresel Sanayi Ağı",
              text:
                "Türk sanayisini global tedarik zincirleriyle dijital ortamda bir araya getiren güçlü bir platform olmak.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                relative p-10 rounded-3xl border border-white/10 bg-white/5
                overflow-hidden group
                hover:border-sky-500/40 hover:shadow-[0_0_45px_rgba(56,189,248,0.25)]
                transition-all duration-500
              "
            >
              {/* Hareketli çizgi glow */}
              <div
                className="
                  absolute top-0 left-0 w-full h-0.5
                  bg-linear-to-r from-transparent via-sky-400 to-transparent
                  opacity-0 group-hover:opacity-100 animate-movingLight
                "
              />

              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-lg text-slate-300">{item.text}</p>
            </div>
          ))}

        </div>
      </section>

      {/* =============================== */}
      {/* ⚙ MİSYON */}
      {/* =============================== */}
      <section id="misyonumuz" className="max-w-8xl mx-auto px-6 py-24 animate-fadeInUp">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
          Misyonumuz
        </h2>

        <p className="text-lg text-slate-300 max-w-5xl leading-relaxed">
          Materyon’un misyonu; endüstriyel makine ve hammadde sektöründeki bilgi,
          ürün ve ticaret akışını hızlandırmak, doğrudan iletişimi kolaylaştırmak
          ve işletmelere güvenilir bir dijital altyapı sunmaktır.
        </p>

        <p
          className="text-lg text-slate-300 max-w-5xl leading-relaxed mt-6"
        >
          Türkiye’nin üretim gücünü dijital dünyada görünür kılarak
          sanayi ekonomisine değer katmayı hedefliyoruz.
        </p>
      </section>

      {/* =============================== */}
      {/* 🧩 KULLANIM ŞEKLİ */}
      {/* =============================== */}
      <section className="max-w-8xl mx-auto px-6 py-24">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-16">
          Platform Kullanım Şekli
        </h2>

        <div className="grid md:grid-cols-4 gap-10">

          {[
            "Hesap oluştur",
            "Kategori seç & ilan ara",
            "Kendi ilanını ekle",
            "Satıcıyla / alıcıyla iletişime geç",
          ].map((item, i) => (
            <div
              key={i}
              className="
                p-10 rounded-3xl border border-white/10 bg-white/5
                hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(56,189,248,0.20)]
                transition-all duration-300
              "
            >
              <div className="text-4xl font-extrabold text-sky-500 mb-6">
                {i + 1}
              </div>

              <p className="text-lg text-slate-300">{item}</p>
            </div>
          ))}

        </div>
      </section>
      {/* =============================== */}
{/* 📝 GERİ BİLDİRİM FORMU */}
{/* =============================== */}
<section className="max-w-4xl mx-auto px-6 py-24 animate-fadeInUp">
  <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-10">
    Görüş ve Önerileriniz
  </h2>

  <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto text-lg">
    Materyon şu an aktif geliştirme aşamasında. 
    Eksik gördüğünüz, önerdiğiniz veya eklenmesini istediğiniz tüm özellikleri bildirebilirsiniz.
  </p>

  <div className="
    bg-white/5 
    border border-white/10 
    rounded-3xl 
    p-10 
    backdrop-blur-xl
    shadow-[0_0_35px_rgba(56,189,248,0.15)]
  ">
    <form
  onSubmit={async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Mesaj başarıyla gönderildi ✅");
      e.currentTarget.reset();
    } else {
      alert("Gönderme başarısız ❌");
    }
  }}
  className="flex flex-col gap-6"
>


      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300">Adınız</label>
          <input
            type="text"
            name="name"
            required
            className="input-field"
            placeholder="Adınızı yazın"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300">E-posta</label>
          <input
            type="email"
            name="email"
            required
            className="input-field"
            placeholder="Sizinle iletişime geçmemiz gerekirse"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-300">Mesajınız</label>
        <textarea
          name="message"
          required
          placeholder="Öneriniz, şikayetiniz veya eklenmesini istediğiniz özellik..."
          className="input-field min-h-[140px]"
        />
      </div>

      <button
        type="submit"
        className="
          btn-primary
          w-full
          py-3
          text-base
          font-semibold
          rounded-xl
          shadow-[0_0_20px_rgba(56,189,248,0.5)]
        "
      >
        Gönder
      </button>
    </form>
  </div>
</section>

    </div>
  );
}
