export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Materyon | Makine & Hammadde Pazarı",
  description: "Makineler ve hammaddeler için modern ilan platformu",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseReadOnlyClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body className="page-shell relative z-0 overflow-x-hidden">
        <Header userEmail={user?.email ?? null} />
        <main className="pt-24 pb-12">
          <div className="mx-auto max-w-6xl px-4">{children}</div>
        </main>
        <Toaster
          position="top-left"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "10px",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
