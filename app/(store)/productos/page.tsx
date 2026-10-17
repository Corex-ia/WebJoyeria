import { Suspense } from "react";
import { createClient } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          {activeCategory ? activeCategory.name : "Toda la tienda"}
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          {products.length} producto{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">Categorías</h3>
          <nav className="space-y-1">
            <a
              href="/productos"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                !cat
                  ? "bg-gold-100 text-gold-800 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gold-700"
              }`}
            >
              Todas
            </a>
            {categories.map((c) => (
              <a
                key={c.id}
                href={`/productos?cat=${c.slug}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  cat === c.slug
                    ? "bg-gold-100 text-gold-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gold-700"
                }`}
              >
                {c.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1">
            <a
              href="/productos"
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                !cat
                  ? "bg-gold-600 text-white border-gold-600"
                  : "border-gray-300 text-gray-600 hover:border-gold-400"
              }`}
            >
              Todas
            </a>
            {categories.map((c) => (
              <a
                key={c.id}
                href={`/productos?cat=${c.slug}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  cat === c.slug
                    ? "bg-gold-600 text-white border-gold-600"
                    : "border-gray-300 text-gray-600 hover:border-gold-400"
                }`}
              >
                {c.name}
              </a>
            ))}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">💎</div>
              <p className="text-lg font-medium">No hay productos disponibles</p>
              <p className="text-sm mt-2">
                {cat ? "Prueba otra categoría." : "Los productos aparecerán aquí una vez configurada la base de datos."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
