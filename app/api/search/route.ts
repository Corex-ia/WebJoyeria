import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) return NextResponse.json({ products: [] });

  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug)")
    .eq("status", "publish")
    .or(`name.ilike.%${q}%,description.ilike.%${q}%,sku.ilike.%${q}%`)
    .limit(20);

  return NextResponse.json({ products: data ?? [] });
}
