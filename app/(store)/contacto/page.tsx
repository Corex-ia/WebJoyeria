import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto — Joyería Oasis",
  description: "Contáctanos por WhatsApp, teléfono o correo. También encuentra respuestas a las preguntas frecuentes sobre nuestras joyas de oro en Guatemala.",
};

const FAQS = [
  {
    q: "¿Los productos son artesanales?",
    a: "Sí, cada pieza lleva un proceso diferente, elaboradas por manos guatemaltecas con ayuda de innovación tecnológica con el propósito de entregar piezas únicas.",
  },
  {
    q: "¿Cuánto tiempo toma la fabricación de mi joya?",
    a: "Los aretes Stud son fabricados con antelación para la entrega inmediata al cliente. Sin embargo, todo el arete largo (típico) tiene un límite de tiempo establecido de 5 días.",
  },
  {
    q: "¿Es posible pagar por medio de Transferencia o Depósito?",
    a: "Sí, puedes adquirir el número de nuestras cuentas bancarias por medio de mensaje directo.",
  },
  {
    q: "¿Realizan envíos a todo el país?",
    a: "Sí, contamos con los servicios de Cargo Express y Forza para envíos a todo Guatemala.",
  },
  {
    q: "¿Cuánto debo esperar por mi pedido?",
    a: "Las empresas de logística tienen un plazo de entrega en la ciudad capital de 24 horas después de la confirmación del pago. En departamentos ajenos a Guatemala el plazo es de 2 a 3 días hábiles.",
  },
  {
    q: "¿La factura es obligatoria?",
    a: "No, solo se proporciona factura cuando el cliente la solicite.",
  },
];

export default function ContactoPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-surface-200 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Estamos aquí para ti</p>
          <h1
            className="font-serif text-ink"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            Contáctanos
          </h1>
        </div>
      </section>

      {/* ── Contact cards ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {/* WhatsApp */}
            <a
              href="https://wa.me/50238021693"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-surface-300 p-8 hover:border-gold-400 transition-colors duration-300"
            >
              <MessageCircle className="w-6 h-6 text-gold-400 mb-6" />
              <p className="label-u text-gold-500 mb-3">WhatsApp</p>
              <p
                className="font-serif text-ink mb-2 group-hover:text-gold-500 transition-colors duration-300"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400 }}
              >
                +502 3802-1693
              </p>
              <p className="text-ink-soft text-sm">Respuesta en minutos</p>
              <div className="flex items-center gap-1 mt-6 label-u text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Escribir ahora <ArrowUpRight className="w-3 h-3" />
              </div>
            </a>

            {/* Teléfono */}
            <a
              href="tel:+50238021693"
              className="group border border-surface-300 p-8 hover:border-gold-400 transition-colors duration-300"
            >
              <Phone className="w-6 h-6 text-gold-400 mb-6" />
              <p className="label-u text-gold-500 mb-3">Teléfono</p>
              <p
                className="font-serif text-ink mb-2 group-hover:text-gold-500 transition-colors duration-300"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400 }}
              >
                +502 3802-1693
              </p>
              <p className="text-ink-soft text-sm">Lun – Sáb · 9am a 6pm</p>
            </a>

            {/* Correo */}
            <a
              href="mailto:joyeriaoasisgt@gmail.com"
              className="group border border-surface-300 p-8 hover:border-gold-400 transition-colors duration-300"
            >
              <Mail className="w-6 h-6 text-gold-400 mb-6" />
              <p className="label-u text-gold-500 mb-3">Correo electrónico</p>
              <p
                className="font-serif text-ink mb-2 group-hover:text-gold-500 transition-colors duration-300"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400 }}
              >
                joyeriaoasisgt@gmail.com
              </p>
              <p className="text-ink-soft text-sm">Respuesta en 24 horas</p>
            </a>
          </div>

          {/* ── FAQs ── */}
          <div className="max-w-3xl">
            <span className="block w-10 h-px bg-gold-500 mb-8" />
            <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Preguntas frecuentes</p>
            <h2
              className="font-serif text-ink mb-12"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}
            >
              Resolvemos tus dudas
            </h2>

            <div className="divide-y divide-surface-300">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="group py-6 cursor-pointer list-none">
                  <summary className="flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                    <span
                      className="font-serif text-ink group-open:text-gold-500 transition-colors duration-200"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400 }}
                    >
                      {q}
                    </span>
                    <span className="flex-none w-5 h-5 border border-ink/20 group-open:border-gold-400 flex items-center justify-center text-ink/40 group-open:text-gold-500 transition-all duration-200 text-xs">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:block">−</span>
                    </span>
                  </summary>
                  <p className="mt-4 text-ink-soft leading-relaxed text-sm">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="label-u text-gold-500 mb-3 tracking-[0.3em]">¿No encontraste tu respuesta?</p>
            <h2
              className="font-serif text-white"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400 }}
            >
              Escríbenos por WhatsApp
            </h2>
          </div>
          <a
            href="https://wa.me/50238021693?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20joyas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-gold flex-none"
          >
            Escribir ahora <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* ── Políticas link ── */}
      <section className="bg-surface-200 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-3">
          <span className="label-u text-ink-soft">¿Necesitas hacer un cambio?</span>
          <Link href="/politicas-de-cambio" className="label-u text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1">
            Ver políticas de cambio <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
