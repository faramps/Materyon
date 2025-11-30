export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4">
      <div className="glass-panel w-full max-w-md px-8 py-10 text-center">

        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-xl font-semibold">Kayıt İşlemi Başarılı</h1>
          <p className="text-sm text-slate-400 max-w-sm">
            E-posta adresinize gönderilen doğrulama linkine tıklayarak
            hesabınızı aktif edin.  
            Aktifleştirdikten sonra giriş yapabilirsiniz.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <a
            href="/login"
            className="btn-primary text-sm w-full text-center"
          >
            Giriş Yap
          </a>

          <a
            href="/"
            className="btn-ghost text-sm w-full text-center"
          >
            Ana Sayfa
          </a>
        </div>

      </div>
    </div>
  );
}
