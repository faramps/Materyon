"use client";

import { useActionState } from "react";
import { loginUser, type LoginState } from "./actions";

const initialState: LoginState = { error: "" };

export default function LoginPage() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginUser,
    initialState
  );

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <div className="glass-panel w-full max-w-md px-6 py-7">

        <h1 className="text-2xl font-semibold mb-4">Giriş Yap</h1>
        <a
            href="/auth/reset-password"
            className="text-sm text-emerald-400 hover:text-emerald-300"
          >
            Şifremi unuttum
          </a>

        {state.error && (
          <div className="text-xs mb-3 text-red-400 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 mb-1 block">E-posta</label>
            <input name="email" type="email" className="input-field" />
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">Şifre</label>
            <input name="password" type="password" className="input-field" />
          </div>

          <button className="btn-primary w-full mt-2">Giriş Yap</button>
        </form>

      </div>
    </div>
  );
}
