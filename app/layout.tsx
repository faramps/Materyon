export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Piva | Makine & Hammadde Pazarı",
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
    <html lang="tr" suppressHydrationWarning>
      <body className="page-shell">
        <Header userEmail={user?.email ?? null} />
        <main className="pt-24 pb-12">
          <div className="mx-auto max-w-6xl px-4">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
