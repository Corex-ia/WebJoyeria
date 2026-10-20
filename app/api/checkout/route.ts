import { NextRequest, NextResponse } from "next/server";
import { createCheckout } from "@/lib/recurrente";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer, items, total, subtotal,
      shipping_method, shipping_label, shipping_cost,
      coupon_code, discount_amount,
    } = body;

    if (!customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_address: `${customer.address}, ${customer.city}`,
        items,
        subtotal: subtotal ?? total,
        total,
        notes: customer.notes,
        status: "pending",
        shipping_method: shipping_method ?? null,
        shipping_cost: shipping_cost ?? 0,
        coupon_code: coupon_code ?? null,
        discount_amount: discount_amount ?? 0,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Recurrente checkout
    const nameParts = (customer.name as string).trim().split(" ");
    const firstName = nameParts[0] ?? customer.name;
    const lastName = nameParts.slice(1).join(" ") || firstName;
    const shortCorrelative = parseInt(String(Date.now()).slice(-8), 10);

    const checkout = await createCheckout({
      orderNumber: shortCorrelative,
      amount: total,
      description: `Orden ${shortCorrelative} — Joyeria Oasis`,
      billing: {
        name: firstName,
        surname: lastName,
        email: customer.email,
        phone: customer.phone ?? "",
      },
      allowTransfer: true,
    });

    await supabase
      .from("orders")
      .update({ recurrente_id: checkout.id })
      .eq("id", order.id);

    // Decrement stock
    for (const item of items as Array<{ id: string; quantity?: number; qty?: number }>) {
      const qty = item.quantity ?? item.qty ?? 1;
      const { data: prod } = await supabase.from("products").select("stock").eq("id", item.id).single();
      if (prod !== null && prod.stock !== null) {
        await supabase
          .from("products")
          .update({ stock: Math.max(0, (prod.stock as number) - qty) })
          .eq("id", item.id);
      }
    }

    // Increment coupon uses
    if (coupon_code) {
      await supabase.rpc("increment_coupon_uses" as never, { coupon_code } as never).maybeSingle();
      // Fallback if RPC not available
      const { data: cpn } = await supabase.from("coupons").select("uses").eq("code", coupon_code).single();
      if (cpn) {
        await supabase.from("coupons").update({ uses: (cpn.uses ?? 0) + 1 }).eq("code", coupon_code);
      }
    }

    // Send email confirmation (non-blocking)
    sendOrderConfirmation({
      to: customer.email,
      name: customer.name,
      orderId: order.id,
      items: items as Array<{ name: string; price: number; qty?: number; quantity?: number }>,
      subtotal: subtotal ?? total,
      discount: discount_amount ?? 0,
      shippingLabel: shipping_label ?? "A confirmar",
      shippingCost: shipping_cost ?? 0,
      total,
    }).catch(() => {
      // Email failure is non-critical
    });

    return NextResponse.json({ checkout_url: checkout.url, order_id: order.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
