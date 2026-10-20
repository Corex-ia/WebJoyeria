import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("coupons")
      .insert({
        code: body.code,
        description: body.description || null,
        type: body.type,
        amount: body.amount,
        min_order: body.min_order ?? 0,
        max_uses: body.max_uses ?? null,
        active: body.active ?? true,
        expires_at: body.expires_at ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ coupon: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
