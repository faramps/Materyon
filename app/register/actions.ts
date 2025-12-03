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
  const company = formData.get("company")?.toString() || null;
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const passwordAgain = formData.get("passwordAgain")?.toString();

  // Zorunlu alanlar
  if (!fullName || !phone || !email || !password || !passwordAgain) {
    return { error: "Lütfen tüm zorunlu alanları doldurun." };
  }

  if (password !== passwordAgain) {
    return { error: "Şifreler eşleşmiyor." };
  }

  const supabase = await createSupabaseServerActionClient();

  // 1) ❗ AUTH.users tablosunda email var mı?
  const { data: emailExists, error: rpcError } = await supabase.rpc(
    "email_exists",
    { p_email: email }
  );

  if (rpcError) {
    console.log(rpcError);
    return { error: "Kayıt kontrolü sırasında hata oluştu." };
  }

  if (emailExists === true) {
    return { error: "Bu e-posta adresi zaten kayıtlı." };
  }

  // 2) Gerçek kayıt işlemi
  const redirectTo =
    process.env.NEXT_PUBLIC_URL + "/register/success";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        company,
      },
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/register/success");
}
