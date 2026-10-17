import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const slug = (formData.get("product_slug") as string) ?? "product";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `products/${slug}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = supabaseAdmin();
    const { error } = await supabase.storage
      .from("products")
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from("products").getPublicUrl(path);
    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: unknown) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}
