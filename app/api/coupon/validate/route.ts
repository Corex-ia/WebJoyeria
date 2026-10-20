import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { code, order_total } = await req.json();
    if (!code) return NextResponse.json({ error: "Código requerido" }, { status: 400 });

    const supabase = supabaseAdmin();
    const { data: coupon } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase().trim())
      .eq("active", true)
      .single();

    if (!coupon) return NextResponse.json({ error: "Cupón inválido o expirado" }, { status: 404 });

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ error: "Este cupón ha expirado" }, { status: 400 });
    }

    if (coupon.max_uses !== null && coupon.uses >= coupon.max_uses) {
      return NextResponse.json({ error: "Este cupón ya alcanzó su límite de usos" }, { status: 400 });
    }

    if (order_total < coupon.min_order) {
      return NextResponse.json({
        error: `Este cupón requiere un pedido mínimo de Q${coupon.min_order}`,
      }, { status: 400 });
    }

    const discount = coupon.type === "percent"
      ? Math.round((order_total * coupon.amount) / 100 * 100) / 100
      : coupon.amount;

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      type: coupon.type,
      amount: coupon.amount,
      discount,
      description: coupon.description,
    });
  } catch {
    return NextResponse.json({ error: "Error al validar cupón" }, { status: 500 });
  }
}
