import { createClient } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Product, Category } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ cat?: string; q?: string }>;
}

async function getProducts(cat?: string, q?: string): Promise<Product[]> {
  const supabase = createClient();
  let query = supabase
    .from("products")
    .select("*, category:categories(id,name,slug)")
    .eq("status", "publish")
    .order("name");

  if (cat) {
    const { data: catData } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", cat)
      .single();
    if (catData) query = query.eq("category_id", catData.id);
  }

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  const { data } = await query;
  return (data as Product[]) ?? [];
}

async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return (data as Category[]) ?? [];
}

export default async function ProductosPage({ searchParams }: Props) {
  const { cat, q } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(cat, q),
    getCategories(),
  ]);

  const activeCategory = categories.find((c) => c.slug === cat);

  return (
    <div className="bg-surface-100 min-h-screen">
      {/* Page header */}
      <div className="bg-surface-200 border-b border-surface-300 pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="label-u text-gold-500 mb-3">
            {activeCategory ? activeCategory.name : "Tienda completa"}
          </p>
          <h1
            className="font-serif text-ink"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {activeCategory ? activeCategory.name : "Toda la tienda"}
          </h1>
          <p className="label-u text-ink-soft mt-4">
            {products.length} pieza{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex gap-12">

          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-44 flex-shrink-0">
            <p className="label-u text-gold-500 mb-6">Colecciones</p>
            <nav className="space-y-1">
              <Link
                href="/productos"
                className={`block py-2 label-u transition-colors duration-200 border-l-2 pl-3 ${
                  !cat
                    ? "border-gold-400 text-ink"
                    : "border-transparent text-ink-soft hover:text-ink hover:border-surface-400"
                }`}
              >
                Todas
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/productos?cat=${c.slug}`}
                  className={`block py-2 label-u transition-colors duration-200 border-l-2 pl-3 ${
                    cat === c.slug
                      ? "border-gold-400 text-ink"
                      : "border-transparent text-ink-soft hover:text-ink hover:border-surface-400"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile category scroll */}
            <div className="lg:hidden flex gap-6 overflow-x-auto pb-4 mb-8 border-b border-surface-300">
              <Link
                href="/productos"
                className={`flex-shrink-0 label-u pb-3 border-b-2 transition-colors duration-200 ${
                  !cat ? "border-gold-400 text-ink" : "border-transparent text-ink-soft"
                }`}
              >
                Todas
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/productos?cat=${c.slug}`}
                  className={`flex-shrink-0 label-u pb-3 border-b-2 transition-colors duration-200 ${
                    cat === c.slug ? "border-gold-400 text-ink" : "border-transparent text-ink-soft"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>

            {products.length === 0 ? (
              <div className="text-center py-32">
                <div
                  className="mx-auto mb-6 opacity-20"
                  style={{ width: 64, height: 64, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
                />
                <p
                  className="font-serif text-ink/40"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400 }}
                >
                  {cat ? "No hay productos en esta colección." : "No hay productos disponibles."}
                </p>
                {cat && (
                  <Link href="/productos" className="label-u text-gold-500 hover:text-gold-400 mt-6 inline-block transition-colors">
                    Ver toda la tienda
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
