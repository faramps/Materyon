import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Materyon <contact@materyon.com>", // ✅ KENDİ DOMAIN MAİLİN
      to: ["contact@materyon.com"],            // ✅ MAİL BURAYA DÜŞECEK
      replyTo: email,                         // ✅ Cevap direkt kullanıcıya gider
      subject: `Yeni İletişim Mesajı - ${name}`,
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><b>Ad:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mesaj:</b></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL GÖNDERME HATASI:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
