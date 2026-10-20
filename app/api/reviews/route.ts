import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { product_id, author_name, author_email, rating, body } = await req.json();

    if (!product_id || !author_name || !rating || !body) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating debe ser entre 1 y 5" }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const { error } = await supabase.from("product_reviews").insert({
      product_id,
      author_name: author_name.trim(),
      author_email: author_email?.trim() || null,
      rating,
      body: body.trim(),
      approved: false,
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Reseña enviada. Será publicada tras revisión." });
  } catch {
    return NextResponse.json({ error: "Error al enviar reseña" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const product_id = req.nextUrl.searchParams.get("product_id");
  if (!product_id) return NextResponse.json({ reviews: [] });

  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("product_reviews")
    .select("id,author_name,rating,body,created_at")
    .eq("product_id", product_id)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  return NextResponse.json({ reviews: data ?? [] });
}
