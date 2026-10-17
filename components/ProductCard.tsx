"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/recurrente";
import type { Product } from "@/lib/supabase";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, setOpen } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setOpen(true);
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-cream-200">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          {product.thumbnail_url && !imgError ? (
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-cream-200">
              <span className="text-4xl opacity-40">💎</span>
              <span className="label-caps text-ink/30">Foto próximamente</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasDiscount && (
              <span className="badge bg-ink text-white label-caps">Oferta</span>
            )}
          </div>
          {product.category?.name && (
            <span className="absolute top-3 right-3 badge bg-white/90 text-ink/60 label-caps text-[0.55rem]">
              {product.category.name}
            </span>
          )}

          {/* Hover overlay — desktop */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-ink text-white hover:bg-gold-500 hover:text-ink"
              }`}
              style={{ letterSpacing: "0.08em", fontSize: "0.7rem" }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {added ? "¡Agregado!" : "Agregar al carrito"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1">
          <h3
            className="font-serif text-ink text-base font-light leading-snug line-clamp-2 group-hover:text-gold-600 transition-colors duration-200"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-medium text-gold-600">
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-ink/30 line-through">
                {formatCurrency(product.regular_price!)}
              </span>
            )}
          </div>
        </div>

        {/* Mobile add button */}
        <button
          onClick={handleAdd}
          className={`md:hidden w-full mt-2 py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-colors duration-200 ${
            added
              ? "bg-green-600 text-white"
              : "bg-cream-300 text-ink hover:bg-ink hover:text-white"
          }`}
          style={{ letterSpacing: "0.06em" }}
        >
          <ShoppingBag className="w-3 h-3" />
          {added ? "¡Listo!" : "Agregar"}
        </button>
      </div>
    </Link>
  );
}
