"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset() {
    if (!password) return;

    const res = await fetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass-panel w-full max-w-md px-6 py-7">
        <h1 className="text-2xl font-semibold mb-4">Yeni Şifre Belirle</h1>

        <input
          type="password"
          placeholder="Yeni şifre"
          className="input-field w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset} className="btn-primary w-full">
          Şifreyi Güncelle
        </button>

        {message && (
          <p className="text-sm text-green-400 mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}
