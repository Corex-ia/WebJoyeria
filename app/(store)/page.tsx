import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
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
  { slug: "coleccion-primavera", label: "Primavera",  sub: "Colección 2025",          accent: "bg-[#EDE9E1]" },
  { slug: "coleccion-aurea",     label: "Aurea",      sub: "Elegancia atemporal",      accent: "bg-[#E8E3D8]" },
  { slug: "coleccion-kids",      label: "Kids",       sub: "Joyas para los pequeños",  accent: "bg-[#F2EFE9]" },
  { slug: "aretes",              label: "Aretes",     sub: "Diseños únicos y delicados", accent: "bg-[#EAE6DC]" },
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
        <section className="relative min-h-screen bg-surface-200 flex items-end overflow-hidden">
          {/* Decorative gold diamond — subtle, centered background element */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="opacity-[0.06]"
              style={{
                width: 480,
                height: 480,
                border: "1px solid var(--gold)",
                transform: "rotate(45deg)",
              }}
            />
          </div>

          {/* Text block — bottom-left editorial layout */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-12 pb-20 pt-48">
            <div className="max-w-[52%]">
              <p className="label-u text-ink-soft mb-8 tracking-[0.3em]">
                Joyas artesanales 100% guatemaltecas
              </p>

              <h1
                className="font-serif text-ink"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.25rem, 3.8vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                Joyas que cuentan<br />
                una historia:<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>elegancia y amor</em><br />
                en cada detalle.
              </h1>

              <p className="label-u text-ink-soft mt-6 mb-10" style={{ fontSize: "0.7rem" }}>
                Desde 2011 · &quot;Diseñamos cada joya pensando en ti.&quot;
              </p>

              <div className="flex items-center gap-8">
                <Link href="/productos" className="btn-primary">
                  Compra ahora
                </Link>
                <Link
                  href="/productos?cat=coleccion-primavera"
                  className="label-u text-ink-soft hover:text-ink transition-colors duration-200 flex items-center gap-2"
                >
                  Ver colecciones <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right side — hero photo */}
          <div className="absolute top-0 right-0 w-[42%] h-full overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Joyas artesanales Oasis"
              fill
              className="object-cover object-center"
              priority
              sizes="42vw"
            />
          </div>
        </section>

        {/* ── Thin brand statement bar ── */}
        <div className="bg-ink py-4">
          <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
            <p className="label-u text-gold-400 tracking-[0.3em]">Oro 10k puro · Hecho a mano · Guatemala</p>
            <div className="flex items-center gap-2">
              <span className="block w-8 h-px bg-gold-700" />
              <span className="text-gold-700 text-xs">◇</span>
              <span className="block w-8 h-px bg-gold-700" />
            </div>
          </div>
        </div>

        {/* ── Collections — image tiles grid ── */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-12">

            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="label-u text-gold-500 mb-3">Nuestras colecciones</p>
                <h2
                  className="font-serif text-ink"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, lineHeight: 1 }}
                >
                  Explorar
                </h2>
              </div>
              <Link href="/productos" className="label-u text-ink-soft hover:text-gold-500 transition-colors duration-200 flex items-center gap-2">
                Ver todas <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 2×2 tile grid */}
            <div className="grid grid-cols-2 gap-4">
              {COLLECTIONS.map((col) => (
                <Link
                  key={col.slug}
                  href={`/productos?cat=${col.slug}`}
                  className={`group relative flex flex-col justify-end overflow-hidden ${col.accent}`}
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Placeholder visual — centered diamond */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-500"
                      style={{ width: 200, height: 200, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
                    />
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Text */}
                  <div className="relative z-10 p-8">
                    <p className="label-u text-gold-500 group-hover:text-gold-400 transition-colors duration-300 mb-2">
                      {col.sub}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3
                        className="font-serif text-ink group-hover:text-white transition-colors duration-500"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, lineHeight: 1 }}
                      >
                        {col.label}
                      </h3>
                      <ArrowUpRight
                        className="w-5 h-5 text-ink/30 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <section className="bg-surface-100 py-24">
          <div className="max-w-7xl mx-auto px-12">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="label-u text-gold-500 mb-3">Recién llegado</p>
                <h2
                  className="font-serif text-ink"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400 }}
                >
                  Nuevas piezas
                </h2>
              </div>
              <Link href="/productos" className="label-u text-ink-soft hover:text-gold-500 transition-colors duration-200 flex items-center gap-2">
                Ver todas <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-4 gap-8">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p
                className="text-center text-ink/20 py-24"
                style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300 }}
              >
                Los productos aparecerán aquí.
              </p>
            )}
          </div>
        </section>

        {/* ── Brand statement (dark) ── */}
        <section className="bg-ink py-36">
          <div className="max-w-5xl mx-auto px-12">
            <div className="flex flex-col md:flex-row items-start gap-20">
              {/* Left: quote */}
              <div className="flex-1">
                <span className="block w-10 h-px bg-gold-500 mb-10" />
                <p
                  className="font-serif text-white font-normal leading-[1.1] mb-8"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400 }}
                >
                  Somos Fabricantes.<br />
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                    Desde 2011.
                  </em>
                </p>
                <p className="text-white/50 leading-relaxed max-w-sm" style={{ fontSize: "0.95rem" }}>
                  Fabricamos tus joyas con procesos y mano de obra de alta calidad.
                  Nuestros artesanos son joyeros con mucha experiencia y vocación,
                  quienes fabrican cada pieza con sus manos y su corazón.
                </p>
              </div>

              {/* Right: attributes + CTA */}
              <div className="flex-none w-64">
                <div className="space-y-8 mb-12">
                  {[
                    { v: "Oro 10k",       l: "Pureza certificada" },
                    { v: "Artesanal",     l: "Hecho en Guatemala" },
                    { v: "Única",         l: "Cada pieza es irrepetible" },
                  ].map(({ v, l }) => (
                    <div key={v}>
                      <p
                        className="font-serif text-gold-400"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400 }}
                      >
                        {v}
                      </p>
                      <p className="label-u text-white/30 mt-1">{l}</p>
                    </div>
                  ))}
                </div>
                <Link href="/acerca" className="btn-ghost-gold">
                  Conocer nuestra historia
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════
          MOBILE — diseño exclusivo
      ══════════════════════════════════════ */}
      <div className="md:hidden">

        {/* ── Mobile Hero ── */}
        <section className="relative min-h-screen bg-surface-200 flex flex-col justify-end overflow-hidden">
          {/* Background diamond */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none">
            <div style={{ width: 280, height: 280, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
          </div>

          {/* Top image area */}
          <div className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Joyas artesanales Oasis"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 px-7 pb-32 pt-8">
            <p className="label-u text-ink-soft mb-6" style={{ letterSpacing: "0.22em", fontSize: "0.52rem" }}>
              Joyas artesanales · Guatemala · Oro 10k
            </p>
            <h1
              className="font-serif text-ink"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.25rem, 9vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Joyas que cuentan una historia:<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>elegancia y amor.</em>
            </h1>
            <p className="label-u text-ink-soft mt-4 mb-6" style={{ fontSize: "0.6rem" }}>
              Desde 2011 · Fabricamos en Guatemala
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/productos" className="btn-primary justify-center text-center">
                Compra ahora
              </Link>
            </div>
          </div>
        </section>

        {/* ── Mobile Brand bar ── */}
        <div className="bg-ink py-3.5 px-7">
          <p className="label-u text-gold-400 text-center" style={{ fontSize: "0.48rem", letterSpacing: "0.3em" }}>
            Oro 10k puro · Hecho a mano · Guatemala
          </p>
        </div>

        {/* ── Mobile Collections ── */}
        <section className="bg-white py-14">
          <div className="px-7 mb-8">
            <p className="label-u text-gold-500 mb-3" style={{ fontSize: "0.52rem" }}>Colecciones</p>
            <h2
              className="font-serif text-ink"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 9vw, 3rem)", fontWeight: 400 }}
            >
              Explorar
            </h2>
          </div>

          {/* Vertical stacked tiles on mobile */}
          <div className="space-y-3 px-7">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                href={`/productos?cat=${col.slug}`}
                className={`group relative flex items-center justify-between overflow-hidden ${col.accent} px-6 py-5`}
              >
                <div>
                  <p className="label-u text-gold-500 mb-1" style={{ fontSize: "0.5rem" }}>{col.sub}</p>
                  <h3
                    className="font-serif text-ink"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400 }}
                  >
                    {col.label}
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink/30 group-hover:text-gold-500 transition-colors duration-200 flex-none" />
              </Link>
            ))}
          </div>

          <div className="px-7 mt-6">
            <Link href="/productos" className="label-u text-ink-soft hover:text-gold-500 transition-colors flex items-center gap-2" style={{ fontSize: "0.52rem" }}>
              Ver todas las colecciones <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* ── Mobile Products ── */}
        <section className="bg-surface-100 py-14">
          <div className="flex items-end justify-between px-7 mb-8">
            <div>
              <p className="label-u text-gold-500 mb-3" style={{ fontSize: "0.52rem" }}>Recién llegado</p>
              <h2
                className="font-serif text-ink"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 9vw, 3rem)", fontWeight: 400 }}
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
            <p className="px-7 text-ink/25 py-10" style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 300 }}>
              Próximamente...
            </p>
          )}
        </section>

        {/* ── Mobile Statement ── */}
        <section className="bg-ink py-24 px-7">
          <span className="block w-8 h-px bg-gold-500 mb-10" />
          <p
            className="font-serif text-white font-normal mb-4 leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 8vw, 2.5rem)", fontWeight: 400 }}
          >
            Somos Fabricantes.<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Desde 2011.</em>
          </p>
          <p className="text-white/50 leading-relaxed mb-10 text-sm">
            Fabricamos tus joyas con procesos de alta calidad y artesanos con vocación.
          </p>
          <div className="space-y-6 mb-10">
            {[
              { v: "Oro 10k",   l: "Pureza certificada" },
              { v: "Artesanal", l: "Hecho en Guatemala" },
            ].map(({ v, l }) => (
              <div key={v} className="flex items-baseline gap-4">
                <p className="font-serif text-gold-400 text-lg" style={{ fontFamily: "var(--font-serif)" }}>{v}</p>
                <p className="label-u text-white/30" style={{ fontSize: "0.5rem" }}>{l}</p>
              </div>
            ))}
          </div>
          <Link href="/acerca" className="btn-ghost-gold w-full justify-center">
            Conocer nuestra historia
          </Link>
        </section>
      </div>
    </>
  );
}
