import Link from "next/link";
import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

export default async function Header({ userEmail }: { userEmail: string | null }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="glass-panel pointer-events-auto flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-sky-500/80 shadow-lg flex items-center justify-center text-xs font-bold">
              P
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold tracking-tight">Piva</span>
              <span className="text-[10px] text-slate-400">
                Makine & Hammadde Pazarı
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link href="/kategoriler" className="hover:text-sky-400 transition">
              Kategoriler
            </Link>
            <Link href="/listings" className="hover:text-sky-400 transition">
              İlanlar
            </Link>
            <Link href="/hakkinda" className="hover:text-sky-400 transition">
              Hakkında
            </Link>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {userEmail ? (
              <>
                <span className="hidden sm:inline text-xs text-slate-300">
                  Hoş geldin, <span className="font-medium">{userEmail}</span>
                </span>

                <Link href="/account" className="btn-ghost text-xs">
                  Hesabım
                </Link>

                <form action="/logout" method="POST">
                  <button type="submit" className="btn-primary text-xs">
                    Çıkış
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-xs">
                  Giriş
                </Link>
                <Link href="/register" className="btn-primary text-xs">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
