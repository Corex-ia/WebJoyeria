import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import AnimateReveal from "@/components/AnimateReveal";
import type { Product } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug)")
    .eq("status", "publish")
    .order("created_at", { ascending: false })
    .limit(8);
  return (data as Product[]) ?? [];
}

const COLLECTIONS = [
  { slug: "coleccion-primavera", label: "Colección Primavera", desc: "Color y frescura en oro 10k", num: "01" },
  { slug: "coleccion-aurea",     label: "Colección Aurea",     desc: "Elegancia atemporal",         num: "02" },
  { slug: "coleccion-kids",      label: "Colección Kids",      desc: "Joyas para los más pequeños", num: "03" },
  { slug: "aretes",              label: "Aretes",              desc: "Diseños únicos y delicados",   num: "04" },
];

const MARQUEE_ITEMS = [
  "Oro 10k puro",
  "Hecho en Guatemala",
  "Diseño artesanal",
  "Envíos a todo el país",
  "Cada pieza, única",
  "Garantía de calidad",
];

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP
      ══════════════════════════════════════ */}
      <div className="hidden md:block">

        {/* ── Hero ── */}
        <section className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative rings */}
          <div className="ring-deco" style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div className="ring-deco" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderColor: "rgba(201,168,76,0.08)" }} />
          <div className="ring-deco" style={{ width: 300, height: 300, top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderColor: "rgba(201,168,76,0.06)" }} />

          {/* Content */}
          <div className="relative z-10 text-center px-8 max-w-4xl">
            <p className="hero-a0 label-u text-ink-soft mb-10 tracking-[0.3em]">
              Joyería Artesanal · Guatemala · Oro 10k
            </p>

            <h1
              className="hero-a1 font-serif text-ink"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(5rem, 13vw, 11rem)",
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
              }}
            >
              Diseñadas<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>con alma</em>
            </h1>

            <p className="hero-a2 text-ink-soft text-base leading-relaxed mt-10 max-w-sm mx-auto">
              Joyas de oro 10k fabricadas a mano en Guatemala.<br />
              Cada pieza lleva una historia.
            </p>

            <div className="hero-a3 flex items-center justify-center gap-4 mt-10">
              <Link href="/productos" className="btn-primary">
                Ver colección
              </Link>
              <Link href="/productos?cat=coleccion-primavera" className="btn-secondary">
                Primavera 2025
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-a4 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="label-u text-ink/25" style={{ fontSize: "0.5rem", letterSpacing: "0.25em" }}>Descubrir</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── Marquee strip ── */}
        <div className="border-y border-surface-300 py-5 overflow-hidden bg-surface-100 select-none">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="label-u text-ink-soft mx-14 flex items-center gap-14">
                {item}
                <span className="w-px h-3 bg-gold-300 inline-block" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Collections (numbered list, hover inverts) ── */}
        <section className="bg-white py-28">
          <div className="max-w-7xl mx-auto px-12">

            <AnimateReveal>
              <div className="flex items-end justify-between mb-12 pb-8 border-b border-surface-300">
                <div>
                  <p className="label-u text-gold-500 mb-4">Nuestras colecciones</p>
                  <h2
                    className="font-serif text-ink"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 400, lineHeight: 1.05 }}
                  >
                    Explorar
                  </h2>
                </div>
                <Link href="/productos" className="label-u text-ink-soft hover:text-gold-500 transition-colors flex items-center gap-2">
                  Ver todo <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </AnimateReveal>

            <div>
              {COLLECTIONS.map((col, idx) => (
                <AnimateReveal key={col.slug} delay={idx * 80}>
                  <Link
                    href={`/productos?cat=${col.slug}`}
                    className="group flex items-center justify-between py-7 border-b border-surface-300
                               hover:bg-ink transition-all duration-500 px-0 hover:px-8 -mx-0 hover:-mx-12"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  >
                    <div className="flex items-center gap-10">
                      <span
                        className="font-serif text-outline-gold text-5xl font-normal leading-none
                                   group-hover:text-gold-400 transition-all duration-500"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                      >
                        {col.num}
                      </span>
                      <span
                        className="font-serif text-ink text-2xl font-normal group-hover:text-white transition-colors duration-500"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {col.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="label-u text-ink-soft group-hover:text-white/40 transition-colors duration-500">
                        {col.desc}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-ink/20 group-hover:text-gold-400 group-hover:translate-x-0.5
                                   group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    </div>
                  </Link>
                </AnimateReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <section className="bg-surface-100 py-28">
          <div className="max-w-7xl mx-auto px-12">
            <AnimateReveal>
              <div className="flex items-end justify-between mb-16">
                <div>
                  <p className="label-u text-gold-500 mb-4">Recién llegado</p>
                  <h2
                    className="font-serif text-ink"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 400 }}
                  >
                    Nuevas piezas
                  </h2>
                </div>
                <Link href="/productos" className="label-u text-ink-soft hover:text-gold-500 transition-colors flex items-center gap-2">
                  Ver todas <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </AnimateReveal>

            {products.length > 0 ? (
              <div className="grid grid-cols-4 gap-8">
                {products.map((p, i) => (
                  <AnimateReveal key={p.id} delay={i * 60}>
                    <ProductCard product={p} />
                  </AnimateReveal>
                ))}
              </div>
            ) : (
              <p
                className="text-center text-ink/20 py-20"
                style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300 }}
              >
                Los productos aparecerán aquí.
              </p>
            )}
          </div>
        </section>

        {/* ── Statement (dark) ── */}
        <section className="bg-ink py-40">
          <div className="max-w-5xl mx-auto px-12 text-center">
            <AnimateReveal>
              <span className="block w-12 h-px bg-gold-400 mx-auto mb-14 opacity-60" />
              <p
                className="font-serif text-white font-normal leading-[1.1]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 400 }}
              >
                "Cada joya que nace en nuestro taller<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  lleva tu historia contigo"
                </em>
              </p>
            </AnimateReveal>

            <AnimateReveal delay={200}>
              <div className="grid grid-cols-3 gap-12 max-w-md mx-auto mt-20 mb-14">
                {[
                  { v: "10k",  l: "Oro puro" },
                  { v: "GT",   l: "Hecho en Guatemala" },
                  { v: "∞",    l: "Piezas únicas" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <p
                      className="font-serif text-gold-400 font-normal"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}
                    >
                      {v}
                    </p>
                    <p className="label-u text-white/30 mt-2">{l}</p>
                  </div>
                ))}
              </div>
              <Link href="/productos" className="btn-ghost-gold">
                Descubrir la colección
              </Link>
            </AnimateReveal>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════
          MOBILE — diseño exclusivo
      ══════════════════════════════════════ */}
      <div className="md:hidden">

        {/* ── Mobile Hero ── */}
        <section className="relative min-h-screen bg-white flex flex-col justify-end overflow-hidden">
          {/* rings */}
          <div className="ring-deco" style={{ width: 420, height: 420, top: "38%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div className="ring-deco" style={{ width: 260, height: 260, top: "38%", left: "50%", transform: "translate(-50%,-50%)", borderColor: "rgba(201,168,76,0.08)" }} />

          <div className="relative z-10 px-7 pb-36 pt-24">
            <p className="hero-a0 label-u text-ink-soft mb-8" style={{ letterSpacing: "0.22em", fontSize: "0.52rem" }}>
              Joyería Artesanal · Guatemala
            </p>
            <h1
              className="hero-a1 font-serif text-ink"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(3.5rem,16vw,5.5rem)",
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
              }}
            >
              Diseñadas<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>con alma</em>
            </h1>
            <p className="hero-a2 text-ink-soft text-sm leading-relaxed mt-7 max-w-[220px]">
              Oro 10k hecho a mano en Guatemala. Cada pieza, única.
            </p>
            <div className="hero-a3 flex flex-col gap-3 mt-8">
              <Link href="/productos" className="btn-primary justify-center text-center">
                Ver colección
              </Link>
              <Link href="/productos?cat=coleccion-primavera" className="btn-secondary justify-center text-center">
                Colección Primavera
              </Link>
            </div>
          </div>

          <div className="hero-a4 absolute bottom-24 right-7 flex flex-col items-center gap-2">
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── Mobile Marquee ── */}
        <div className="border-y border-surface-300 py-4 overflow-hidden bg-surface-100 select-none">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="label-u text-ink-soft mx-8 flex items-center gap-8" style={{ fontSize: "0.5rem" }}>
                {item} <span className="w-px h-2.5 bg-gold-300 inline-block" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Mobile Collections ── */}
        <section className="bg-white py-14">
          <div className="px-7 mb-8">
            <p className="label-u text-gold-500 mb-3" style={{ fontSize: "0.52rem" }}>Colecciones</p>
            <h2
              className="font-serif text-ink text-4xl font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Explorar
            </h2>
          </div>
          <div className="snap-x-container px-7 pb-2">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                href={`/productos?cat=${col.slug}`}
                className="snap-x-item w-52 bg-surface-100 flex flex-col justify-between p-6 border border-surface-300 hover:border-gold-300 transition-colors duration-300"
                style={{ aspectRatio: "3/4" }}
              >
                <span
                  className="font-serif text-outline-gold text-4xl font-normal"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {col.num}
                </span>
                <div>
                  <p
                    className="font-serif text-ink text-xl font-normal mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {col.label}
                  </p>
                  <p className="label-u text-ink-soft" style={{ fontSize: "0.5rem" }}>{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Mobile Products ── */}
        <section className="bg-surface-100 py-14">
          <div className="flex items-end justify-between px-7 mb-8">
            <div>
              <p className="label-u text-gold-500 mb-3" style={{ fontSize: "0.52rem" }}>Recién llegado</p>
              <h2
                className="font-serif text-ink text-4xl font-normal"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Nuevas piezas
              </h2>
            </div>
            <Link href="/productos" className="label-u text-ink-soft flex items-center gap-1" style={{ fontSize: "0.5rem" }}>
              Ver todas <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="snap-x-container px-7 pb-2">
              {products.map((p) => (
                <div key={p.id} className="snap-x-item w-48">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <p className="px-7 text-ink/25 text-2xl font-serif font-light" style={{ fontFamily: "var(--font-serif)" }}>
              Próximamente...
            </p>
          )}
        </section>

        {/* ── Mobile Statement ── */}
        <section className="bg-ink py-24 px-8 text-center">
          <span className="block w-8 h-px bg-gold-500 mx-auto mb-10 opacity-60" />
          <p
            className="font-serif text-white font-normal mb-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem,8vw,2.5rem)", fontWeight: 400 }}
          >
            "Cada joya lleva<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>tu historia"</em>
          </p>
          <p className="label-u text-white/30 leading-loose mb-10" style={{ fontSize: "0.52rem" }}>
            Oro 10k · Hecho a mano · Guatemala
          </p>
          <Link href="/productos" className="btn-ghost-gold w-full justify-center">
            Ver colección
          </Link>
        </section>
      </div>
    </>
  );
}
