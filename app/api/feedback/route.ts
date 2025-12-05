import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Materyon <onboarding@resend.dev>", // şimdilik böyle kalacak
      to: process.env.CONTACT_RECEIVER!,
      replyTo: email,
      subject: "Yeni Geri Bildirim - Materyon",
      html: `
        <h2>Yeni Geri Bildirim</h2>
        <p><b>Ad:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mesaj:</b></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL HATASI:", error);
    return NextResponse.json({ error: "Mail gönderilemedi" }, { status: 500 });
  }
}
