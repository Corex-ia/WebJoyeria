// Recurrente — pasarela de pago guatemalteca
// API: https://aurora.codingtipi.com/pay/v1/recurrente

const API_URL = "https://aurora.codingtipi.com/pay/v1/recurrente";
const PUBLIC_KEY = process.env.RECURRENTE_PUBLIC_KEY || "";
const SECRET_KEY = process.env.RECURRENTE_SECRET_KEY || "";
// Recurrente validates X-ORIGIN against the store's registered domain
const SITE_URL = process.env.RECURRENTE_ORIGIN || "https://joyeriaoasis.com";

export type RecurrenteCheckout = {
  id: string;
  url: string;
  product: string;
};

export type RecurrenteBilling = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

export async function createCheckout(params: {
  orderNumber: string | number;
  amount: number;
  description: string;
  billing: RecurrenteBilling;
  successUrl: string;
  cancelUrl: string;
  allowTransfer?: boolean;
}): Promise<RecurrenteCheckout> {
  const res = await fetch(`${API_URL}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PUBLIC-KEY": PUBLIC_KEY,
      "X-SECRET-KEY": SECRET_KEY,
      "X-ORIGIN": SITE_URL,
      "X-STORE": "Joyería Oasis",
    },
    body: JSON.stringify({
      number: String(params.orderNumber),
      description: params.description,
      correlative: String(params.orderNumber),
      amount: params.amount,
      currency: "GTQ",
      allowTransfer: params.allowTransfer ?? true,
      installments: "",
      billing: params.billing,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    const debugBody = { number: String(params.orderNumber), description: params.description, correlative: String(params.orderNumber), amount: params.amount, currency: "GTQ", allowTransfer: params.allowTransfer ?? true, installments: "", billing: params.billing, success_url: params.successUrl, cancel_url: params.cancelUrl };
    console.error("Recurrente full payload:", JSON.stringify(debugBody));
    console.error("Recurrente headers:", JSON.stringify({ "X-PUBLIC-KEY": PUBLIC_KEY.slice(0,15) + "...", "X-SECRET-KEY": SECRET_KEY.slice(0,15) + "...", "X-ORIGIN": SITE_URL }));
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
