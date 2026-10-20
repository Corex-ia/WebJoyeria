import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ categories: data });
}

export async function POST(req: NextRequest) {
  const supabase = supabaseAdmin();
  const body = await req.json();
  const { name, slug, description, image_url } = body;
  if (!name || !slug) return NextResponse.json({ error: "name y slug son requeridos" }, { status: 400 });
  const { data, error } = await supabase
    .from("categories")
    .insert({ name, slug, description: description ?? null, image_url: image_url ?? null })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ category: data });
}

export async function PUT(req: NextRequest) {
  const supabase = supabaseAdmin();
  const body = await req.json();
  const { id, name, slug, description, image_url } = body;
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const { data, error } = await supabase
    .from("categories")
    .update({ name, slug, description: description ?? null, image_url: image_url ?? null })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ category: data });
}

export async function DELETE(req: NextRequest) {
  const supabase = supabaseAdmin();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  await supabase.from("products").update({ category_id: null }).eq("category_id", Number(id));
  const { error } = await supabase.from("categories").delete().eq("id", Number(id));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
