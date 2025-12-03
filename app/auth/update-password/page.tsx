"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { updatePassword } from "../actions";

export default function UpdatePasswordPage() {
  const params = useSearchParams();
  const code = params.get("code");

  const [state, formAction] = useActionState(updatePassword, {
    error: "",
    success: ""
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        action={formAction}
        className="w-full max-w-md bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h1 className="text-2xl font-semibold text-white mb-2">
          Yeni Şifre Oluştur
        </h1>

        {!code && (
          <p className="text-red-400 text-sm">
            Auth session missing! Link hatalı olabilir.
          </p>
        )}

        {/* Gizli kod alanı */}
        <input type="hidden" name="code" value={code ?? ""} />

        {/* Yeni şifre */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Yeni Şifre</label>
          <input
            name="password"
            type="password"
            className="input-field"
            placeholder="Yeni şifre"
          />
        </div>

        {/* Yeni şifre tekrar */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Yeni Şifre (Tekrar)</label>
          <input
            name="passwordAgain"
            type="password"
            className="input-field"
            placeholder="Yeni şifre tekrar"
          />
        </div>

        {/* Hata / Başarı */}
        {state.error && (
          <p className="text-red-400 text-sm bg-red-500/10 py-2 px-3 rounded-lg">
            {state.error}
          </p>
        )}

        {state.success && (
          <p className="text-green-400 text-sm bg-green-500/10 py-2 px-3 rounded-lg">
            {state.success}
          </p>
        )}

        <button className="btn-primary w-full mt-3">Şifreyi Güncelle</button>
      </form>
    </div>
  );
}
