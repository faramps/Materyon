export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <span>© {new Date().getFullYear()} Piva. Tüm hakları saklıdır.</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-sky-400 cursor-pointer transition">Gizlilik</span>
          <span className="hover:text-sky-400 cursor-pointer transition">Kullanım Koşulları</span>
        </div>
      </div>
    </footer>
  );
}
