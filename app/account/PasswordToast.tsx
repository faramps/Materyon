"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function PasswordToast() {
  const params = useSearchParams();
  const updated = params.get("password-updated");

  useEffect(() => {
    if (updated === "1") {
      toast.success("Şifren başarıyla güncellendi!");
    }
  }, [updated]);

  return null;
}
