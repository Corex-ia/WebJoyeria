import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";
import type { Product } from "@/lib/supabase";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug)")
    .eq("slug", slug)
    .eq("status", "publish")
    .single();
  return data as Product | null;
}

async function getRelated(categoryId: number | string, excludeId: number | string): Promise<Product[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug)")
    .eq("category_id", categoryId)
    .eq("status", "publish")
    .neq("id", excludeId)
    .limit(4);
  return (data as Product[]) ?? [];
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = product.category_id
    ? await getRelated(product.category_id, product.id)
    : [];

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const allImages = [product.thumbnail_url, ...(product.images ?? [])].filter(Boolean) as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gold-600">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-gold-600">Tienda</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link href={`/productos?cat=${product.category.slug}`} className="hover:text-gold-600">
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
            {allImages[0] ? (
              <Image
                src={allImages[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl bg-gold-50">💎</div>
            )}
            {hasDiscount && (
              <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm px-3 py-1">Oferta</span>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {allImages.map((img, i) => (
                <div key={i} className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-gold-400 cursor-pointer">
                  <Image src={img} alt={`${product.name} ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.category && (
            <Link
              href={`/productos?cat=${product.category.slug}`}
              className="badge bg-gold-100 text-gold-700 hover:bg-gold-200 transition-colors mb-3 inline-block"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-snug">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-gold-700">{formatCurrency(product.price)}</span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">{formatCurrency(product.regular_price!)}</span>
            )}
          </div>
          {product.sku && (
            <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
          )}

          {/* Stock */}
          <div className="mt-4 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${(product.stock ?? 0) > 0 ? "bg-green-500" : "bg-red-400"}`} />
            <span className="text-sm text-gray-600">
              {(product.stock ?? 0) > 0 ? `${product.stock} en stock` : "Sin stock"}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div
              className="mt-6 text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none prose-headings:text-gold-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          {/* Add to cart */}
          <div className="mt-8 space-y-3">
            <AddToCartButton product={product} />
            <Link href="/checkout" className="btn-outline w-full justify-center">
              Comprar ahora
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
            {[
              { icon: "🏅", text: "Oro 10k garantizado" },
              { icon: "🚚", text: "Envío a todo Guatemala" },
              { icon: "🔒", text: "Pago 100% seguro" },
              { icon: "💬", text: "Soporte por WhatsApp" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-lg">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">También te puede gustar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {related.map((p) => {
              // inline mini card to avoid importing ProductCard (it's a client component)
              return (
                <Link key={p.id} href={`/productos/${p.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="relative aspect-square bg-gray-50">
                      {p.thumbnail_url ? (
                        <Image src={p.thumbnail_url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-gold-50">💎</div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gold-700 transition-colors">{p.name}</p>
                      <p className="text-sm font-bold text-gold-700 mt-1">{formatCurrency(p.price)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
