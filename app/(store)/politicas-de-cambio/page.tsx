import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Políticas de Cambio — Joyería Oasis",
  description: "Conoce las políticas de cambio, devoluciones, cuidado de joyas y reparaciones de Joyería Oasis.",
};

const SECTIONS = [
  {
    title: "Cuidado de las joyas",
    items: [
      "Conservarla alejada de la humedad. Después de cada uso pasa un paño seco por la pieza para retirar el exceso de sudor.",
      "Guarda cada pieza en un joyero especial de terciopelo o alguna otra tela lisa para mantener su brillo original.",
      "Retira la joya antes de bañarte, entrar a la playa, piscina o hacer cualquier actividad en el gym.",
      "Evita el contacto con químicos agresivos como perfumes, jabón o cremas directamente en las piezas.",
    ],
    note: "Si la joya ha presentado algún cambio de color, lava con jabón líquido que ataque la grasa con apoyo de un cepillo de cerdas suaves y agua.",
  },
  {
    title: "Cambios y devoluciones",
    body: "Cada una de nuestras joyas se fabrica con cuidado y materiales de la más alta calidad, por lo que respaldamos con confianza cada uno de nuestros productos. Sin embargo en caso de cualquier defecto de fabricación, Oasis se hará responsable y correrá con todos los gastos durante el proceso. Esto no aplica si está relacionado por mal uso, golpes, exposición a productos químicos, PH ácido de la piel o reparaciones ajenas a Oasis.\n\nTenga en cuenta que las ligeras irregularidades y variaciones en la artesanía no se consideran defectos de fábrica.\n\nEl reporte de inconformidad debe ser enviado en un plazo de 1 a 3 días después de la compra. Todas las solicitudes de cambio o devolución estarán sometidas a una pequeña inspección. Si aplica, debe presentar fotografía del estado actual de la joya y comprobante de pago.",
    defects: [
      "Gemas quebradas, flojas o mal colocadas",
      "Rayaduras y abolladuras (no aplica a las perlas blancas)",
      "Piezas incompletas o con defectos de ensamblaje visibles al momento de recibirlas",
    ],
    note: "Aviso importante: Joyería Oasis no hace reembolsos de dinero.",
  },
  {
    title: "Productos personalizados o con descuento",
    body: "Los artículos personalizados o modificados ajenos a su estilo original no son elegibles para cambio o devolución. Su fabricación es de manera exclusiva conforme a las especificaciones del cliente, por lo que no son adecuadas para su reventa.\n\nDe igual manera, todas las joyas compradas en ofertas, descuentos o combos se consideran ventas definitivas y no se rigen bajo las mismas condiciones de cambio que los productos a precio habitual.",
  },
  {
    title: "Reparaciones",
    body: "Una vez pasados los días permitidos para reclamos, la joya se tomará como usada y ya no prosigue como garantía, sino como reparación. En estos casos aplica el mal uso, golpes, exposición a productos químicos, PH ácido de la piel o reparaciones ajenas a Oasis. Todos los gastos corren por cuenta del cliente.",
    repairs: [
      "Limpieza profunda para devolver el brillo original perdido por PH o productos agresivos",
      "Piezas quebradas que necesiten soldadura para ser unidas nuevamente",
    ],
  },
  {
    title: "Escenarios inusuales",
    body: "Si en algún momento llegara a solicitar el reemplazo de piezas dañadas o pérdidas, no se tomará como reparación sino como compra de desperdicio por parte de la empresa y la venta de una pieza nueva para el cliente.",
  },
];

export default function PoliticasPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-surface-200 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Transparencia ante todo</p>
          <h1
            className="font-serif text-ink"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Políticas de<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>cambio y cuidado</em>
          </h1>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-16">
          {SECTIONS.map((s, i) => (
            <div key={s.title}>
              <div className="flex items-start gap-6 mb-6">
                <span
                  className="font-serif text-gold-400 opacity-40 flex-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", fontWeight: 300, lineHeight: 1 }}
                >
                  0{i + 1}
                </span>
                <h2
                  className="font-serif text-ink pt-1"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 400 }}
                >
                  {s.title}
                </h2>
              </div>

              {s.body && s.body.split("\n\n").map((p, j) => (
                <p key={j} className="text-ink-soft leading-relaxed text-sm mb-4">{p}</p>
              ))}

              {s.items && (
                <ul className="space-y-3 mb-4">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-ink-soft">
                      <span className="w-1 h-1 rounded-full bg-gold-400 flex-none mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {s.defects && (
                <div className="mb-4">
                  <p className="label-u text-ink-soft mb-3" style={{ fontSize: "0.55rem" }}>Se consideran defectos de fábrica:</p>
                  <ul className="space-y-2">
                    {s.defects.map((d, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-ink-soft">
                        <span className="w-1 h-1 rounded-full bg-gold-400 flex-none mt-2" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.repairs && (
                <div className="mb-4">
                  <p className="label-u text-ink-soft mb-3" style={{ fontSize: "0.55rem" }}>Se cobra por:</p>
                  <ul className="space-y-2">
                    {s.repairs.map((r, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-ink-soft">
                        <span className="w-1 h-1 rounded-full bg-gold-400 flex-none mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.note && (
                <p className="border-l-2 border-gold-400 pl-4 text-sm text-ink-soft italic mt-4">{s.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="label-u text-ink-soft">¿Tienes alguna pregunta sobre estas políticas?</p>
          <Link href="/contacto" className="btn-primary flex items-center gap-2">
            Contáctanos <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
