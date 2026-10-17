import { NextRequest, NextResponse } from "next/server";
import { createCheckout } from "@/lib/recurrente";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, total } = body;

    if (!customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const origin = req.nextUrl.origin;

    // Create order in DB
    const supabase = supabaseAdmin();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_address: `${customer.address}, ${customer.city}`,
        items,
        subtotal: total,
        total,
        notes: customer.notes,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create Recurrente checkout
    const checkout = await createCheckout({
      items: items.map((i: { name: string; price: number; qty: number }) => ({
        name: i.name,
        amount_in_cents: Math.round(i.price * 100),
        quantity: i.qty,
        currency: "GTQ",
      })),
      success_url: `${origin}/pedido/confirmado?order=${order.id}`,
      cancel_url: `${origin}/checkout`,
      metadata: { order_id: order.id },
    });

    // Update order with recurrente id
    await supabase
      .from("orders")
      .update({ recurrente_id: checkout.id })
      .eq("id", order.id);

    return NextResponse.json({ checkout_url: checkout.checkout_url, order_id: order.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
