"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


// STATE tipi
export type ActionState = {
  error: string;
  success: string;
};

// ----------------------------------
// 1) RESET PASSWORD – SEND EMAIL
// ----------------------------------
export async function sendResetEmail(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email")?.toString();

  if (!email) {
    return { error: "Email gerekli", success: "" };
  }

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/update-password",
  });

  if (error) return { error: error.message, success: "" };

  return { error: "", success: "Mail gönderildi" };
}


// ----------------------------------
// 2) UPDATE PASSWORD – CHANGE PASSWORD
// ----------------------------------
export async function updatePassword(prevState: any, formData: FormData) {
  const code = formData.get("code")?.toString();
  const newPassword = formData.get("password")?.toString();
  const passwordAgain = formData.get("passwordAgain")?.toString();


  if (!code) return { error: "Auth session missing!", success: "" };
  if (!newPassword) return { error: "Şifre gerekli", success: "" };
   if (newPassword !== passwordAgain)
    return { error: "Şifreler eşleşmiyor", success: "" };

  const supabase = await createSupabaseServerActionClient();

  // Token ile session başlat
  const { error: authError } = await supabase.auth.exchangeCodeForSession(code);

  if (authError) {
    return { error: "Session oluşturulamadı", success: "" };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) return { error: error.message, success: "" };

  // 🔥 ŞİFRE DEĞİŞİNCE PROFİLE YÖNLENDİR
  redirect("/account?password-updated=1");
}