"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "./actions";

const initialState: RegisterState = { error: "" };

export default function RegisterPage() {
  const [state, formAction] = useActionState<RegisterState, FormData>(
    registerUser,
    initialState
  );

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <div className="glass-panel w-full max-w-md px-6 py-7">
        
        <h1 className="text-2xl font-semibold mb-3">Hesap Oluştur</h1>

        {state.error && (
          <div className="text-xs mb-3 text-red-400 bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 mb-1 block">Ad Soyad</label>
            <input name="fullName" className="input-field" />
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">Telefon</label>
            <input name="phone" className="input-field" />
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">E-posta</label>
            <input name="email" type="email" className="input-field" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">Şifre</label>
              <input type="password" name="password" className="input-field" />
            </div>

            <div>
              <label className="text-xs text-slate-300 mb-1 block">Şifre Tekrar</label>
              <input type="password" name="passwordAgain" className="input-field" />
            </div>
          </div>

          <button className="btn-primary w-full mt-1">Kayıt Ol</button>
        </form>

      </div>
    </div>
  );
}
