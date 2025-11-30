"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type LoginState = {
  error: string;
};

export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Lütfen tüm alanları doldurun." };
  }

  const supabase = await createSupabaseServerActionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "E-posta veya şifre hatalı." };
  }

  redirect("/account");

  return { error: "" }; // unreachable ama TS için gerekli
}
