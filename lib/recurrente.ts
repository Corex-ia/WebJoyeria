// Recurrente — pasarela de pago guatemalteca
// Docs: https://developers.recurrente.com

const API_URL = process.env.RECURRENTE_API_URL || "https://app.recurrente.com/api";
const API_KEY = process.env.RECURRENTE_API_KEY || "";

export type RecurrenteCheckout = {
  id: string;
  checkout_url: string;
};

export type RecurrenteItem = {
  name: string;
  description?: string;
  amount_in_cents: number;
  currency: string;
  quantity: number;
  image_url?: string;
};

export async function createCheckout(params: {
  items: RecurrenteItem[];
  success_url: string;
  cancel_url: string;
  metadata?: Record<string, string>;
}): Promise<RecurrenteCheckout> {
  const res = await fetch(`${API_URL}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PUBLIC-KEY": API_KEY,
    },
    body: JSON.stringify({
      items: params.items,
      success_url: params.success_url,
      cancel_url: params.cancel_url,
      metadata: params.metadata,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Recurrente error ${res.status}: ${err}`);
  }

  return res.json();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2,
  }).format(amount);
}
