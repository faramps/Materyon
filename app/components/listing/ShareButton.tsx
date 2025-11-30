"use client";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Bağlantı panoya kopyalandı!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-3 w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
    >
      İlanı Paylaş
    </button>
  );
}
