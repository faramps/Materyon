"use server";

import sharp from "sharp";
import { createSupabaseServerActionClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/supabase/slugify";

export async function createListing(formData: FormData) {
  const supabase = await createSupabaseServerActionClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapmalısın." };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category_final") as string;

  const location = JSON.parse(formData.get("location") as string);
  const rawPaths: string[] = JSON.parse(formData.get("uploaded_paths") as string);

  const finalImages: string[] = [];

  for (const rawPath of rawPaths) {
    const { data: rawFile } = await supabase.storage
      .from("listings")
      .download(rawPath);

    if (!rawFile) continue;

    const buffer = Buffer.from(await rawFile.arrayBuffer());
    const webp = await sharp(buffer).webp({ quality: 75 }).toBuffer();

    const base = rawPath.split("/").pop()?.replace(/\..+$/, "")!;
    const newPath = `webp/${base}.webp`;

    await supabase.storage.from("listings").upload(newPath, webp, {
      contentType: "image/webp",
    });

    // RAW dosyasını sil
    await supabase.storage.from("listings").remove([rawPath]);

    finalImages.push(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listings/${newPath}`
    );
  }

  await supabase.from("listings").insert({
    user_id: user.id,
    title,
    description,
    price,
    category,
    location,
    images: finalImages,
    slug: `${slugify(title)}-${Date.now()}`,
  });

  return { success: true };
}
