import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de nosotros — Joyería Oasis",
  description:
    "Somos una empresa guatemalteca fabricando joyas desde 2011. Conoce nuestra historia, misión y valores.",
};

export default function AcercaPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-surface-200 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Desde 2011</p>
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
            Acerca de<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>nosotros</em>
          </h1>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-start prose-justify">
          <div>
            <span className="block w-10 h-px bg-gold-500 mb-8" />
            <h2
              className="font-serif text-ink mb-8"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}
            >
              Nuestra historia
            </h2>
            <p className="text-ink/70 leading-relaxed" style={{ fontSize: "1.05rem" }}>
              Joyería Oasis inició sus labores en el año 2011 como un emprendimiento temporal fundado
              por Geovanni, un hombre de familia cuyo deseo era brindar una mejor vida a su esposa e
              hijas. Tras varios años de experiencia hoy en día se ha establecido como una empresa
              familiar, digna de reconocimiento gracias a su transparencia, excelencia y originalidad
              con la que opera.
            </p>
            <p className="text-ink/70 leading-relaxed mt-6" style={{ fontSize: "1.05rem" }}>
              Sus procesos de reducción distintos a los demás es una de las razones por la que ha
              logrado ese reconocimiento. Su combinación entre tecnología y artesanía es lo que ha
              generado su crecimiento sostenido a lo largo de más de una década.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-8 pt-4">
            {[
              {
                title: "Excelencia",
                body: "Cada pieza es fabricada en Oro 10 kt y plata 925, 100% garantizado.",
              },
              {
                title: "Innovación",
                body: "Combinamos tecnología con técnicas artesanales para crear joyas únicas y sofisticadas.",
              },
              {
                title: "Compromiso",
                body: "Desde la fabricación hasta la entrega final del producto, la marca está orientada a brindar una experiencia excepcional al poner atención en cada detalle.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-gold-400 pl-6">
                <h3
                  className="font-serif text-ink mb-2"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400 }}
                >
                  {title}
                </h3>
                <p className="text-ink/60 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Misión y Visión ── */}
      <section className="bg-ink py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Misión */}
            <div>
              <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Nuestra misión</p>
              <p className="text-white/75 leading-relaxed" style={{ fontSize: "1.05rem" }}>
                Somos una empresa guatemalteca con más de una década de experiencia profesional en el
                diseño, fabricación y distribución de joyas en oro y plata. Ofrecemos productos de la
                más alta calidad, elaborados con precisión y detalle mediante procesos innovadores que
                combinan tecnología moderna y arte artesanal. Nos distinguimos por resaltar la belleza
                y elegancia de nuestros clientes, brindando confianza, exclusividad y una experiencia
                que refleje orgullo guatemalteco en cada pieza.
              </p>
            </div>

            {/* Visión */}
            <div>
              <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Nuestra visión</p>
              <p className="text-white/75 leading-relaxed" style={{ fontSize: "1.05rem" }}>
                Ser la joyería líder en Guatemala reconocida por su excelencia, innovación y
                compromiso con el cliente, destacando en la producción de joyería artesanal de alta
                calidad. Buscamos consolidarnos como una marca referente que inspire la elegancia y
                posicione el talento guatemalteco en el mercado nacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface-200 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="label-u text-gold-500 mb-4 tracking-[0.3em]">Fabricamos joyas desde 2011</p>
          <h2
            className="font-serif text-ink mb-8"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 400 }}
          >
            Conoce nuestro catálogo
          </h2>
          <a href="/productos" className="btn-primary inline-flex">
            Ver colección
          </a>
        </div>
      </section>
    </>
  );
}
