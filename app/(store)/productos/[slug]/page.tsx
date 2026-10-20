import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Lock, MessageCircle, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";
import type { Product } from "@/lib/supabase";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";

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
    <div className="bg-surface-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface-200 border-b border-surface-300 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <nav className="flex items-center gap-2">
            <Link href="/" className="label-u text-ink-soft hover:text-ink transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3 text-ink/20" />
            <Link href="/productos" className="label-u text-ink-soft hover:text-ink transition-colors">Tienda</Link>
            {product.category && (
              <>
                <ChevronRight className="w-3 h-3 text-ink/20" />
                <Link href={`/productos?cat=${product.category.slug}`} className="label-u text-ink-soft hover:text-ink transition-colors">
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3 text-ink/20" />
            <span className="label-u text-ink truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden bg-surface-200">
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
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-surface-200">
                  <div
                    className="opacity-15"
                    style={{ width: 120, height: 120, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
                  />
                  <span className="label-u text-ink/20" style={{ fontSize: "0.48rem" }}>Fotografía próximamente</span>
                </div>
              )}
              {hasDiscount && (
                <span className="absolute top-4 left-4 label-u bg-ink text-white px-3 py-1.5">Oferta</span>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 overflow-hidden flex-shrink-0 border border-surface-300 hover:border-gold-400 cursor-pointer transition-colors duration-200"
                  >
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
                className="label-u text-gold-500 hover:text-gold-400 transition-colors duration-200 inline-block mb-4"
              >
                {product.category.name}
              </Link>
            )}

            <h1
              className="font-serif text-ink"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mt-5">
              <span
                className="font-serif text-gold-500"
                style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400 }}
              >
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="label-u text-ink-soft line-through">{formatCurrency(product.regular_price!)}</span>
              )}
            </div>

            {product.sku && (
              <p className="label-u text-ink/25 mt-2" style={{ fontSize: "0.48rem" }}>SKU: {product.sku}</p>
            )}

            {/* Stock */}
            <div className="mt-5 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${(product.stock ?? 0) > 0 ? "bg-emerald-500" : "bg-red-400"}`} />
              <span className="label-u text-ink-soft">
                {(product.stock ?? 0) > 0 ? `${product.stock} disponibles` : "Sin stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div
                className="mt-6 text-ink-soft text-sm leading-relaxed border-t border-surface-300 pt-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Add to cart */}
            <div className="mt-8 space-y-3">
              <AddToCartButton product={product} />
              <Link href="/checkout" className="btn-secondary w-full justify-center">
                Comprar ahora
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 border-t border-surface-300 pt-6 grid grid-cols-2 gap-4">
              {[
                { Icon: ShieldCheck, text: "Oro 10k garantizado" },
                { Icon: Truck,       text: "Envío a todo Guatemala" },
                { Icon: Lock,        text: "Pago 100% seguro" },
                { Icon: MessageCircle, text: "Soporte por WhatsApp" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-gold-400 flex-none" />
                  <span className="label-u text-ink-soft">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ProductReviews productId={String(product.id)} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-white border-t border-surface-300 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="label-u text-gold-500 mb-3">De la misma colección</p>
            <h2
              className="font-serif text-ink mb-10"
              style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400 }}
            >
              También te puede gustar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
