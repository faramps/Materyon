"use client";

export default function FeedbackForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input name="name" required className="input-field" placeholder="Adınız" />
        <input name="email" required type="email" className="input-field" />
        <textarea name="message" required className="input-field min-h-[140px]" />
        <button type="submit" className="btn-primary py-3 rounded-xl">
          Gönder
        </button>
      </form>
    </div>
  );
}
