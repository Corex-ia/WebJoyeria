// Recurrente — pasarela de pago guatemalteca
// API: https://aurora.codingtipi.com/pay/v1/recurrente
// success_url/cancel_url NOT sent — handled via Recurrente dashboard + webhook

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
  allowTransfer?: boolean;
}): Promise<RecurrenteCheckout> {
  const res = await fetch(`${API_URL}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PUBLIC-KEY": PUBLIC_KEY,
      "X-SECRET-KEY": SECRET_KEY,
      "X-ORIGIN": SITE_URL,
      "X-STORE": "Joyeria Oasis",
    },
    body: JSON.stringify({
      number: typeof params.orderNumber === "string" ? parseInt(params.orderNumber, 10) || params.orderNumber : params.orderNumber,
      description: params.description,
      correlative: typeof params.orderNumber === "string" ? parseInt(params.orderNumber, 10) || params.orderNumber : params.orderNumber,
      amount: params.amount.toFixed(2),
      currency: "GTQ",
      allowTransfer: params.allowTransfer ?? true,
      installments: "",
      billing: params.billing,
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
