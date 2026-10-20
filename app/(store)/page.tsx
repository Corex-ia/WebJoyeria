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
        <section
          className="relative overflow-hidden"
          style={{ height: "860px", marginTop: "96px", background: "#F5F3EF" }}
        >
          {/* Model photo — right side, narrower so earring is fully visible */}
          <div className="absolute top-0 right-0 h-full overflow-hidden" style={{ width: "46%" }}>
            <Image
              src="/images/hero-model-hd.jpg"
              alt="Modelo con arete de oro y perla — Joyería Oasis"
              fill
              className="object-cover"
              style={{ objectPosition: "60% 12%" }}
              priority
              quality={95}
              sizes="46vw"
            />
            {/* Left fade: seamlessly blends model into background */}
            <div
              className="absolute inset-y-0 left-0 pointer-events-none"
              style={{
                width: "220px",
                background: "linear-gradient(to right, #F5F3EF 0%, #F5F3EF 15%, transparent 100%)",
              }}
            />
          </div>

          {/* Subtle background diamond — decorative */}
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none" style={{ paddingLeft: "8%" }}>
            <div
              className="opacity-[0.045]"
              style={{ width: 520, height: 520, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
            />
          </div>

          {/* Text block — editorial left layout */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center z-20" style={{ width: "50%", paddingLeft: "5.5rem", paddingRight: "3rem" }}>
            <p className="label-u text-gold-500 mb-8 tracking-[0.3em] hero-a0" style={{ fontSize: "0.58rem" }}>
              Joyas artesanales · Guatemala · Desde 2011
            </p>

            <h1
              className="font-serif text-ink hero-a1"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 3.6vw, 4.25rem)",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              Joyas que<br />
              cuentan una<br />
              historia:<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>elegancia<br />y amor.</em>
            </h1>

            <p className="label-u text-ink-soft mt-7 mb-10 hero-a2" style={{ fontSize: "0.62rem", maxWidth: "320px", lineHeight: 1.9 }}>
              Diseñadas y fabricadas a mano por artesanos guatemaltecos.
              Cada pieza es única e irrepetible.
            </p>

            <div className="flex items-center gap-8 hero-a3">
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

          {/* Piece photo — floating editorial card at the junction of text + model */}
          <div
            className="absolute z-30 hero-a4"
            style={{
              bottom: "72px",
              left: "42%",
              transform: "translateX(-50%) rotate(-1.5deg)",
              width: "310px",
              height: "215px",
              boxShadow: "0 28px 60px rgba(10,10,10,0.22), 0 4px 16px rgba(10,10,10,0.12)",
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/hero-pieza-perla.jpg"
                alt="Arete de oro 10k con perla natural — Joyería Oasis"
                fill
                className="object-cover"
                quality={95}
                sizes="310px"
              />
              {/* Thin gold inner frame */}
              <div
                className="absolute inset-[6px] pointer-events-none"
                style={{ border: "1px solid rgba(201,168,76,0.4)" }}
              />
            </div>
            {/* Label below the photo card */}
            <div
              className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-3"
            >
              <span className="block h-px bg-gold-400" style={{ width: "28px" }} />
              <span className="label-u text-gold-500" style={{ fontSize: "0.5rem", letterSpacing: "0.28em" }}>
                Colección Aurea
              </span>
              <span className="block h-px bg-gold-400" style={{ width: "28px" }} />
            </div>
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
        <section
          className="relative overflow-hidden"
          style={{ minHeight: "600px", marginTop: "96px", background: "#F5F3EF" }}
        >
          {/* Model photo — upper 58% */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "58%" }}>
            <Image
              src="/images/hero-model-hd.jpg"
              alt="Modelo con arete — Joyería Oasis"
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
            />
            {/* Bottom fade into background */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ height: "80px", background: "linear-gradient(to bottom, transparent, #F5F3EF)" }}
            />
          </div>

          {/* Piece photo — floating card overlapping the photo/text boundary */}
          <div
            className="absolute z-20"
            style={{
              top: "calc(58% - 56px)",
              right: "24px",
              width: "140px",
              height: "100px",
              boxShadow: "0 16px 40px rgba(10,10,10,0.25)",
              transform: "rotate(1.5deg)",
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/hero-pieza-perla.jpg"
                alt="Arete de oro y perla"
                fill
                className="object-cover"
                quality={90}
                sizes="140px"
              />
              <div className="absolute inset-[4px]" style={{ border: "1px solid rgba(201,168,76,0.4)" }} />
            </div>
          </div>

          {/* Text content */}
          <div className="relative z-10 px-7 pb-12" style={{ paddingTop: "calc(58% - 10px)" }}>
            <p className="label-u text-gold-500 mb-5" style={{ letterSpacing: "0.25em", fontSize: "0.5rem" }}>
              Joyas artesanales · Guatemala · Oro 10k
            </p>
            <h1
              className="font-serif text-ink"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.1rem, 8.5vw, 3.2rem)",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
              }}
            >
              Joyas que cuentan<br />
              una historia:<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>elegancia y amor.</em>
            </h1>
            <p className="label-u text-ink-soft mt-4 mb-7" style={{ fontSize: "0.57rem" }}>
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
