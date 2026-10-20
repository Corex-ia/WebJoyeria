import { formatCurrency } from "./recurrente";

interface OrderEmailParams {
  to: string;
  name: string;
  orderId: string;
  items: Array<{ name: string; price: number; qty?: number; quantity?: number }>;
  subtotal: number;
  discount: number;
  shippingLabel: string;
  shippingCost: number;
  total: number;
}

export async function sendOrderConfirmation(params: OrderEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // Email not configured — skip silently

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const itemsHtml = params.items.map((item) => {
    const qty = item.quantity ?? item.qty ?? 1;
    return `<tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0ede8;font-size:14px;color:#2c2825;">${item.name}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f0ede8;text-align:right;white-space:nowrap;font-size:14px;color:#2c2825;">
        ${qty > 1 ? `${qty} × ` : ""}${formatCurrency(item.price * qty)}
      </td>
    </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Confirmación de pedido</title></head>
<body style="margin:0;padding:0;background:#f8f6f2;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e8e4df;">
    <div style="background:#2c2825;padding:32px 40px;text-align:center;">
      <h1 style="color:#c9a84c;font-size:24px;font-weight:400;margin:0;letter-spacing:0.05em;">Joyería Oasis</h1>
      <p style="color:#fff;opacity:.5;font-size:11px;letter-spacing:.15em;text-transform:uppercase;margin:8px 0 0;">Confirmación de Pedido</p>
    </div>
    <div style="padding:40px;">
      <p style="font-size:16px;color:#2c2825;margin:0 0 8px;">Hola, <strong>${params.name}</strong></p>
      <p style="font-size:14px;color:#6b6460;margin:0 0 32px;">Tu pedido fue recibido. Te contactaremos pronto para coordinar la entrega.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0ede8;">
        ${itemsHtml}
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
        <tr>
          <td style="font-size:13px;color:#6b6460;padding:4px 0;">Subtotal</td>
          <td style="font-size:13px;color:#6b6460;text-align:right;">${formatCurrency(params.subtotal)}</td>
        </tr>
        ${params.discount > 0 ? `<tr>
          <td style="font-size:13px;color:#2d7a4f;padding:4px 0;">Descuento</td>
          <td style="font-size:13px;color:#2d7a4f;text-align:right;">−${formatCurrency(params.discount)}</td>
        </tr>` : ""}
        <tr>
          <td style="font-size:13px;color:#6b6460;padding:4px 0;">Envío — ${params.shippingLabel}</td>
          <td style="font-size:13px;color:#6b6460;text-align:right;">${params.shippingCost === 0 ? "Gratis" : formatCurrency(params.shippingCost)}</td>
        </tr>
        <tr>
          <td style="font-size:16px;font-weight:600;color:#2c2825;padding:12px 0 0;border-top:1px solid #f0ede8;">Total</td>
          <td style="font-size:16px;font-weight:600;color:#c9a84c;text-align:right;padding:12px 0 0;border-top:1px solid #f0ede8;">${formatCurrency(params.total)}</td>
        </tr>
      </table>

      <p style="font-size:13px;color:#6b6460;margin:32px 0 0;">Número de pedido: <code style="font-family:monospace;color:#2c2825;">${params.orderId.slice(0,8).toUpperCase()}</code></p>
    </div>
    <div style="background:#f8f6f2;padding:24px 40px;text-align:center;border-top:1px solid #e8e4df;">
      <p style="font-size:12px;color:#6b6460;margin:0;">¿Dudas? Escríbenos por WhatsApp.<br>Joyería Oasis · Desde 2011 · Guatemala</p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: "Joyería Oasis <pedidos@joyeriaoasis.com>",
    to: params.to,
    subject: `Pedido recibido — Joyería Oasis`,
    html,
  });
}
