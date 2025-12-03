export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#020617]/60 backdrop-blur-xl py-10">
      
      <div className="absolute top-0 left-0 w-full h-0.5
        bg-linear-to-r from-transparent via-sky-500/70 to-transparent 
        animate-movingLight opacity-50" 
      />

      <div className="max-w-8xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-300">
        
        <span>© {new Date().getFullYear()} Materyon. Tüm hakları saklıdır.</span>

        <div className="flex items-center gap-6">
          {["Gizlilik", "Kullanım Koşulları", "İletişim"].map((item, i) => (
            <span
              key={i}
              className="
                cursor-pointer hover:text-sky-400 relative group transition
              "
            >
              {item}
              <span
                className="
                  absolute -bottom-0.5 left-0 w-full h-0.5
                  bg-linear-to-r from-transparent via-sky-500 to-transparent
                  scale-x-0 group-hover:scale-x-100 
                  transition-transform duration-300
                "
              />
            </span>
          ))}
        </div>

      </div>
    </footer>
  );
}
