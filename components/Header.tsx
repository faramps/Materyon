"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Header({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-10000 backdrop-blur-xl bg-[#020617]/40 border-b border-white/10">
      <div className="mx-auto max-w-8xl px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/img/logo.png"
            alt="Materyon Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-slate-100">Materyon</span>
            <span className="text-[10px] text-slate-400">Makine & Hammadde Pazarı</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/kategori" className="text-slate-300 hover:text-sky-400 transition">Kategoriler</Link>
          

          <button onClick={() => scrollTo("hakkimizda")} className="text-slate-300 hover:text-sky-400 transition">
            Hakkımızda
          </button>
          <button onClick={() => scrollTo("vizyonumuz")} className="text-slate-300 hover:text-sky-400 transition">
            Vizyonumuz
          </button>
          <button onClick={() => scrollTo("misyonumuz")} className="text-slate-300 hover:text-sky-400 transition">
            Misyonumuz
          </button>
        </nav>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {userEmail ? (
            <>
              <span className="text-xs text-slate-300">
                Hoş geldin, <span className="font-semibold text-sky-400">{userEmail}</span>
              </span>

              <Link href="/account" className="btn-ghost text-xs">
                Hesabım
              </Link>

              <form action="/logout" method="POST">
                <button
                  type="submit"
                  className="btn-primary text-xs"
                >
                  Çıkış Yap
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost text-xs">Giriş Yap</Link>
              <Link href="/register" className="btn-primary text-xs">Kayıt Ol</Link>
            </>
          )}
        </div>

        {/* ===== MOBILE MENU ===== */}
        <Sheet open={open} onOpenChange={setOpen}>
          
          {/* ❗ BURASI DÜZELTİLDİ: sadece hamburger gösteriyoruz */}
          <SheetTrigger className="md:hidden text-slate-300 text-3xl active:scale-90 transition">
            ☰
          </SheetTrigger>

        <SheetContent side="right" className="bg-[#071425] text-white px-0">

  {/* ÜST BAR — Materyon + X */}
 {/* ÜST BAR — Materyon */}
<div className="w-full flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
  <h2 className="text-lg font-semibold tracking-wide text-center">
    Materyon
  </h2>
</div>


  {/* MENÜ ÖĞELERİ */}
  <div className="flex flex-col">
    <button
      onClick={pathname === "/kategori" ? () => setOpen(false) : () => { window.location.href = "/kategori"; setOpen(false); }}
      className="py-4 text-center text-[15px] font-medium hover:text-sky-400 transition border-b border-white/10"
    >
      Kategoriler
    </button>

    

    <button
      onClick={() => { scrollTo("hakkimizda"); setOpen(false); }}
      className="py-4 text-center text-[15px] font-medium hover:text-sky-400 transition border-b border-white/10"
    >
      Hakkımızda
    </button>

    <button
      onClick={() => { scrollTo("vizyonumuz"); setOpen(false); }}
      className="py-4 text-center text-[15px] font-medium hover:text-sky-400 transition border-b border-white/10"
    >
      Vizyonumuz
    </button>

    <button
      onClick={() => { scrollTo("misyonumuz"); setOpen(false); }}
      className="py-4 text-center text-[15px] font-medium hover:text-sky-400 transition border-b border-white/10"
    >
      Misyonumuz
    </button>

    {/* ALT KISIM */}
    <div className="mt-auto px-6 py-6 flex flex-col gap-4 border-t border-white/10">

      {userEmail ? (
        <>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-center text-sm hover:bg-white/10 transition"
          >
            Hesabım
          </Link>

          <form action="/logout" method="POST">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold text-center hover:bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] transition"
            >
              Çıkış Yap
            </button>
          </form>
        </>
      ) : (
        <>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-center text-sm hover:bg-white/10 transition"
          >
            Giriş Yap
          </Link>

          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="w-full px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold text-center hover:bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] transition"
          >
            Kayıt Ol
          </Link>
        </>
      )}

    </div>
  </div>
</SheetContent>

        </Sheet>
      </div>
    </header>
  );
}
