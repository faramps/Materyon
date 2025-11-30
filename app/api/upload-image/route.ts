import { NextResponse } from "next/server";
import { createSupabaseServerActionClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerActionClient();

  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) return NextResponse.json({ error: "Dosya yok" });

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

  const { data, error } = await supabase.storage
    .from("listings")
    .upload(fileName, buffer, {
      contentType: file.type,
    });

  if (error) return NextResponse.json({ error });

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listings/${fileName}`;

  return NextResponse.json({ url });
}
