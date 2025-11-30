"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type RegisterState = {
  error: string;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const fullName = formData.get("fullName")?.toString();
  const phone = formData.get("phone")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const passwordAgain = formData.get("passwordAgain")?.toString();

  if (!fullName || !phone || !email || !password || !passwordAgain) {
    return { error: "Lütfen tüm alanları doldurun." };
  }

  if (password !== passwordAgain) {
    return { error: "Şifreler eşleşmiyor." };
  }

  const supabase = await createSupabaseServerActionClient();

  const redirectTo =
    process.env.NEXT_PUBLIC_URL + "/register/success";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone },
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/register/success");

  return { error: "" }; // TS için
}
