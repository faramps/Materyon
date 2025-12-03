"use client";

import { useActionState } from "react";
import { sendResetEmail, type ActionState } from "../actions";

const initial: ActionState = { error: "", success: "" };

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(sendResetEmail, initial);

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <div className="glass-panel w-full max-w-md px-6 py-7">

        <h1 className="text-2xl font-semibold mb-3 text-white">
          Şifre Sıfırlama
        </h1>

        <p className="text-slate-400 text-sm mb-5">
          Hesabınıza bağlı e-posta adresini girin. Size şifre yenileme bağlantısı göndereceğiz.
        </p>

        {/* Hata mesajı */}
        {state.error && (
          <div className="text-xs mb-3 text-red-400 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
            {state.error}
          </div>
        )}

        {/* Başarı mesajı */}
        {state.success && (
          <div className="text-xs mb-3 text-emerald-400 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl px-3 py-2">
            {state.success}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 mb-1 block">E-posta</label>
            <input
              name="email"
              type="email"
              className="input-field"
              placeholder="ornek@mail.com"
            />
          </div>

          <button className="btn-primary w-full mt-1">
            Mail Gönder
          </button>
        </form>

        <div className="mt-5 text-center">
          <a href="/login" className="text-slate-400 text-sm hover:text-white transition">
            → Giriş sayfasına dön
          </a>
        </div>
      </div>
    </div>
  );
}
