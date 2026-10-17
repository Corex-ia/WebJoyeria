import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/lib/supabase";

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

async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  return (data as Category[]) ?? [];
}

const HERO_CATEGORIES = [
  { slug: "coleccion-primavera", label: "Primavera", emoji: "🌸", desc: "Frescura y color en oro 10k" },
  { slug: "coleccion-aurea", label: "Aurea", emoji: "✨", desc: "Elegancia atemporal" },
  { slug: "coleccion-kids", label: "Kids", emoji: "🌟", desc: "Joyas para los más pequeños" },
  { slug: "aretes", label: "Aretes", emoji: "💎", desc: "Diseños únicos y exclusivos" },
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([getFeaturedProducts(), getCategories()]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gold-900 via-gold-800 to-dark overflow-hidden min-h-[520px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">💍</div>
          <div className="absolute top-32 right-20 text-6xl">✨</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">💎</div>
          <div className="absolute bottom-10 right-10 text-7xl">🌟</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <p className="text-gold-300 text-sm font-medium tracking-widest uppercase mb-4">Joyería artesanal guatemalteca</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Joyas de Oro 10k<br />
            <span className="text-gold-300">hechas con amor</span>
          </h1>
          <p className="text-gold-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Descubre nuestra colección de aretes, studs y joyas finas. Cada pieza es única, fabricada en Guatemala con los mejores materiales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos" className="btn-gold text-base px-8 py-4">
              Ver toda la tienda
            </Link>
            <Link href="/productos?cat=coleccion-primavera" className="btn-outline border-gold-300 text-gold-100 hover:bg-gold-800 text-base px-8 py-4">
              Colección Primavera
            </Link>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/productos?cat=${cat.slug}`}
                className="group flex flex-col items-center p-6 rounded-2xl border border-gold-100 hover:border-gold-400 hover:bg-gold-50 transition-all duration-200 text-center"
              >
                <span className="text-4xl mb-3">{cat.emoji}</span>
                <span className="font-semibold text-gray-900 group-hover:text-gold-700 transition-colors">{cat.label}</span>
                <span className="text-xs text-gray-500 mt-1">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gold-600 text-sm font-medium uppercase tracking-widest mb-1">Recién llegado</p>
              <h2 className="text-3xl font-serif font-bold text-gray-900">Nuevas joyas</h2>
            </div>
            <Link href="/productos" className="btn-outline text-sm px-4 py-2">
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p>Los productos se mostrarán aquí una vez conectada la base de datos.</p>
              <Link href="/admin" className="mt-4 inline-block text-gold-600 hover:underline text-sm">
                Ir al panel de administración →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Brand Promise */}
      <section className="bg-gold-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🏅", title: "Oro 10k Garantizado", desc: "Cada joya viene con certificado de calidad. Oro puro, precio justo." },
              { icon: "🚚", title: "Envío a todo Guatemala", desc: "Empaque discreto y seguro. Recibe en 2-5 días hábiles en cualquier departamento." },
              { icon: "💬", title: "Atención personalizada", desc: "Asesoría en WhatsApp. Te ayudamos a elegir la joya perfecta." },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-gold-600 text-sm font-medium uppercase tracking-widest mb-1">Explora</p>
              <h2 className="text-3xl font-serif font-bold text-gray-900">Todas las categorías</h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/productos?cat=${cat.slug}`}
                  className="px-5 py-2.5 rounded-full border border-gold-200 text-gold-700 font-medium text-sm hover:bg-gold-600 hover:text-white hover:border-gold-600 transition-all duration-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
