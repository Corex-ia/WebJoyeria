import Link from "next/link";

export default function PedidoConfirmadoPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">💎</div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">¡Pedido confirmado!</h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Tu pago fue procesado exitosamente. Recibirás un correo de confirmación con los detalles de tu pedido y la información de envío.
        </p>
        <div className="bg-gold-50 rounded-2xl p-6 mb-8 text-left space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2"><span>📧</span> Revisa tu correo para la confirmación</p>
          <p className="flex items-center gap-2"><span>🚚</span> Tu pedido llegará en 2-5 días hábiles</p>
          <p className="flex items-center gap-2"><span>💬</span> Puedes rastrear tu pedido por WhatsApp</p>
        </div>
        <Link href="/productos" className="btn-gold">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
