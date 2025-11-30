import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            res.cookies.set(cookie.name, cookie.value, cookie.options);
          });
        },
      },
    }
  );

  // ↙ Bu satır cookie setAll'ı tetikler
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = [
    "/account",
    "/ilan/create",
    "/favorites",
    "/profile",
  ];

  const path = req.nextUrl.pathname;

  if (protectedRoutes.some((p) => path.startsWith(p))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/ilan/:path*",
    "/favorites/:path*",
    "/profile/:path*",
  ],
};
