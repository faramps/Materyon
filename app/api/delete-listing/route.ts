import { NextResponse } from "next/server";
import { createSupabaseServerActionClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerActionClient();

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID eksik" }, { status: 400 });
  }

  // Silme işlemi
  await supabase.from("listings").delete().eq("id", id);

  return NextResponse.json({ success: true });
}
