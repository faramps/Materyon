"use server";

import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** 
 * ✔ Server Action & Route Handler – tam yetkili client
 * ✔ Cookie set edebilir
 */
export async function createSupabaseServerActionClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach((cookie) => cookieStore.set(cookie));
        },
      },
    }
  );
}

/**
 * ✔ Server Component – read-only client
 * ❗ Cookie set etmez
 */
export async function createSupabaseReadOnlyClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Cookie yazma YASAK (header/layout için)
        },
      },
    }
  );
}
