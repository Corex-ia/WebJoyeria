import Link from "next/link";
import { createClient } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

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
  { slug: "coleccion-primavera", label: "Primavera", desc: "Color y frescura en oro 10k", num: "01" },
  { slug: "coleccion-aurea",     label: "Aurea",     desc: "Elegancia atemporal",         num: "02" },
  { slug: "coleccion-kids",      label: "Kids",      desc: "Joyas para los más pequeños", num: "03" },
  { slug: "aretes",              label: "Aretes",    desc: "Diseños únicos",               num: "04" },
];

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">

        {/* ── Hero ── */}
        <section className="relative min-h-screen bg-ink flex flex-col justify-end overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 70% 40%, #2D1F0A 0%, #0D0B08 100%)" }}
          />
          <div
            className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #D4A84B 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-12 pb-24 pt-40">
            <div className="flex items-center gap-4 mb-10 animate-fade-up">
              <span className="gold-line-lg" />
              <span className="label-caps text-gold-400">Joyería Artesanal Guatemalteca</span>
            </div>
            <h1
              className="font-serif text-white animate-fade-up-delay-1"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
              }}
            >
              Joyas que<br />
              <em className="not-italic" style={{ color: "#D4A84B" }}>cuentan</em><br />
              historias
            </h1>
            <div className="mt-12 flex items-center gap-6 animate-fade-up-delay-2">
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Oro 10k fabricado a mano en Guatemala.<br />Cada pieza, única.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/productos" className="btn-gold">
                  Ver colección <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/productos?cat=coleccion-primavera" className="btn-outline-light">
                  Primavera
                </Link>
              </div>
            </div>
            <div className="mt-20 flex items-center gap-3 animate-fade-up-delay-3">
              <span className="block w-px h-8 bg-gold-600 animate-pulse" />
              <span className="label-caps text-white/25">Explorar</span>
            </div>
          </div>
        </section>

        {/* ── Collections ── */}
        <section className="bg-cream py-28">
          <div className="max-w-7xl mx-auto px-12">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="label-caps text-gold-500 block mb-4">Nuestras colecciones</span>
                <h2 className="font-serif text-ink" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.1 }}>
                  Diseñadas con propósito,<br /><em className="not-italic text-gold-500">hechas con amor</em>
                </h2>
              </div>
              <Link href="/productos" className="flex items-center gap-2 label-caps text-ink/40 hover:text-gold-500 transition-colors duration-300">
                Ver todo <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {COLLECTIONS.map((col) => (
                <Link key={col.slug} href={`/productos?cat=${col.slug}`}
                  className="group relative bg-ink overflow-hidden aspect-[3/4] flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="label-caps text-gold-500">{col.num}</span>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at center, #D4A84B, transparent 70%)" }} />
                  <div>
                    <p className="font-serif text-white text-2xl font-light mb-1 group-hover:text-gold-300 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-cormorant)" }}>
                      {col.label}
                    </p>
                    <p className="text-white/40 text-xs">{col.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products ── */}
        <section className="bg-cream-50 py-28">
          <div className="max-w-7xl mx-auto px-12">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="label-caps text-gold-500 block mb-4">Recién llegado</span>
                <h2 className="font-serif text-ink" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300 }}>
                  Nuevas joyas
                </h2>
              </div>
              <Link href="/productos" className="flex items-center gap-2 label-caps text-ink/40 hover:text-gold-500 transition-colors duration-300">
                Ver todas <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {products.length > 0 ? (
              <div className="grid grid-cols-4 gap-6">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <p className="text-center font-serif text-3xl text-ink/20 font-light py-20"
                style={{ fontFamily: "var(--font-cormorant)" }}>
                Los productos se mostrarán aquí una vez conectada la base de datos.
              </p>
            )}
          </div>
        </section>

        {/* ── Brand Promise ── */}
        <section className="bg-ink py-32">
          <div className="max-w-4xl mx-auto px-12 text-center">
            <span className="gold-line-lg mx-auto block mb-10" />
            <h2 className="font-serif text-white font-light mb-8"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.15 }}>
              "Cada joya que sale de nuestro taller<br />
              <em className="not-italic text-gold-400">lleva una historia contigo"</em>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-12">
              Trabajamos con oro 10k de la más alta calidad, combinando técnicas artesanales con diseños contemporáneos que celebran la identidad guatemalteca.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-14">
              {[{ val: "10k", label: "Oro puro" }, { val: "GT", label: "Hecho en Guatemala" }, { val: "∞", label: "Piezas únicas" }].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-gold-400 text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>{val}</p>
                  <p className="label-caps text-white/30 mt-2">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/productos" className="btn-gold">
              Descubrir la colección <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE LAYOUT — diseño exclusivo para móvil
      ════════════════════════════════════════════════════════ */}
      <div className="md:hidden">

        {/* ── Mobile Hero: full viewport, portrait ── */}
        <section className="relative h-screen bg-ink flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 120% 80% at 50% 30%, #2D1F0A 0%, #0D0B08 100%)" }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #D4A84B 0%, transparent 70%)" }}
          />
          <div className="relative z-10 px-7 pb-32 pt-24">
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <span className="gold-line" />
              <span className="label-caps text-gold-400" style={{ fontSize: "0.55rem" }}>Joyería Artesanal · Guatemala</span>
            </div>
            <h1 className="font-serif text-white animate-fade-up-delay-1"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.8rem", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
              Joyas<br />que<br /><em className="not-italic" style={{ color: "#D4A84B" }}>cuentan</em><br />historias
            </h1>
            <p className="text-white/40 text-xs leading-relaxed mt-6 mb-8 animate-fade-up-delay-2 max-w-[220px]">
              Oro 10k hecho a mano en Guatemala. Cada pieza, única.
            </p>
            <div className="flex flex-col gap-3 animate-fade-up-delay-3">
              <Link href="/productos" className="btn-gold justify-center text-center">
                Ver colección <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/productos?cat=coleccion-primavera" className="btn-outline-light justify-center text-center">
                Colección Primavera
              </Link>
            </div>
          </div>
        </section>

        {/* ── Mobile Collections: horizontal scroll ── */}
        <section className="bg-cream py-12">
          <div className="px-6 mb-6">
            <span className="label-caps text-gold-500 block mb-2" style={{ fontSize: "0.55rem" }}>Colecciones</span>
            <h2 className="font-serif text-ink text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Explora
            </h2>
          </div>
          <div
            className="flex gap-3 overflow-x-auto px-6 pb-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                href={`/productos?cat=${col.slug}`}
                className="flex-none w-44 aspect-[2/3] bg-ink relative overflow-hidden flex flex-col justify-between p-5"
                style={{ scrollSnapAlign: "start" }}
              >
                <span className="label-caps text-gold-500" style={{ fontSize: "0.5rem" }}>{col.num}</span>
                <div>
                  <p className="font-serif text-white text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>{col.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Mobile Products: horizontal carousel ── */}
        <section className="bg-cream-50 py-12">
          <div className="flex items-end justify-between px-6 mb-6">
            <div>
              <span className="label-caps text-gold-500 block mb-2" style={{ fontSize: "0.55rem" }}>Recién llegado</span>
              <h2 className="font-serif text-ink text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                Nuevas joyas
              </h2>
            </div>
            <Link href="/productos" className="label-caps text-ink/40 flex items-center gap-1" style={{ fontSize: "0.55rem" }}>
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div
              className="flex gap-4 overflow-x-auto px-6 pb-4"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            >
              {products.map((p) => (
                <div key={p.id} className="flex-none w-44" style={{ scrollSnapAlign: "start" }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <p className="px-6 text-ink/30 text-sm font-serif text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Próximamente...
            </p>
          )}
        </section>

        {/* ── Mobile Brand Promise ── */}
        <section className="bg-ink py-20 px-8 text-center">
          <span className="gold-line mx-auto block mb-8" />
          <h2 className="font-serif text-white font-light mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", lineHeight: 1.2 }}>
            "Cada joya lleva<br />
            <em className="not-italic text-gold-400">una historia contigo"</em>
          </h2>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs mx-auto mb-10">
            Oro 10k trabajado a mano desde nuestro taller en Guatemala.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[{ val: "10k", label: "Oro puro" }, { val: "GT", label: "Guatemala" }, { val: "∞", label: "Única" }].map(({ val, label }) => (
              <div key={label}>
                <p className="font-serif text-gold-400 text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>{val}</p>
                <p className="label-caps text-white/30 mt-1" style={{ fontSize: "0.5rem" }}>{label}</p>
              </div>
            ))}
          </div>
          <Link href="/productos" className="btn-gold w-full justify-center">
            Ver colección <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </>
  );
}
