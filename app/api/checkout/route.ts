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

    // Split name into first/last for Recurrente billing
    const nameParts = (customer.name as string).trim().split(" ");
    const firstName = nameParts[0] ?? customer.name;
    const lastName = nameParts.slice(1).join(" ") || firstName;

    // Recurrente requires a short numeric-friendly correlative (rejects UUIDs)
    const shortCorrelative = String(Date.now()).slice(-8);

    // Create Recurrente checkout
    const checkout = await createCheckout({
      orderNumber: shortCorrelative,
      amount: total,
      description: `Pedido Joyería Oasis. Al finalizar tu pago serás redirigido de vuelta a la tienda.`,
      billing: {
        name: firstName,
        surname: lastName,
        email: customer.email,
        phone: customer.phone ?? "",
      },
      successUrl: `${origin}/pedido/confirmado?order=${order.id}`,
      cancelUrl: `${origin}/checkout`,
      allowTransfer: true,
    });

    // Update order with Recurrente checkout id
    await supabase
      .from("orders")
      .update({ recurrente_id: checkout.id })
      .eq("id", order.id);

    return NextResponse.json({ checkout_url: checkout.url, order_id: order.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
