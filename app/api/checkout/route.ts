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

    // Recurrente requires a short numeric correlative (rejects UUIDs)
    const shortCorrelative = parseInt(String(Date.now()).slice(-8), 10);

    // Create Recurrente checkout — no success/cancel URLs (handled via merchant dashboard + webhook)
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
