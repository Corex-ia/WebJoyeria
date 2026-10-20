"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/recurrente";
import type { Product } from "@/lib/supabase";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, setOpen } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const outOfStock = product.stock !== undefined && product.stock !== null && product.stock <= 0;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setOpen(true);
  }

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      {/* Image container */}
      <div className={`relative aspect-square overflow-hidden bg-surface-100 ${outOfStock ? "opacity-70" : ""}`}>
        {product.thumbnail_url && !imgError ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div
              className="w-14 h-14 rounded-full border border-gold-300 flex items-center justify-center
                         transition-transform duration-500 group-hover:scale-110"
            >
              <span className="text-gold-400 text-xl">◇</span>
            </div>
            <span className="label-u text-ink/20" style={{ fontSize: "0.48rem" }}>Foto próximamente</span>
          </div>
        )}

        {/* Out of stock badge */}
        {outOfStock && (
          <span className="absolute top-3 left-3 label-u bg-gray-500 text-white px-2.5 py-1">
            Agotado
          </span>
        )}

        {/* Sale badge */}
        {!outOfStock && hasDiscount && (
          <span className="absolute top-3 left-3 label-u bg-ink text-white px-2.5 py-1">
            Oferta
          </span>
        )}

        {/* Add to cart — slides up on hover (desktop) */}
        {!outOfStock && (
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0
                       transition-transform duration-400 ease-spring hidden md:block"
          >
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 label-u flex items-center justify-center gap-2 transition-colors duration-200 ${
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-ink text-white hover:bg-gold-400 hover:text-ink"
              }`}
            >
              <Plus className="w-3 h-3" />
              {added ? "¡Agregado!" : "Añadir al carrito"}
            </button>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="mt-3">
        <h3 className="text-sm text-ink leading-snug line-clamp-2 group-hover:text-gold-500 transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2.5 mt-1.5">
          <span className="text-sm text-gold-500 font-medium">
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
        disabled={outOfStock}
        className={`md:hidden w-full mt-2.5 py-2.5 label-u flex items-center justify-center gap-2
                    transition-colors duration-200 ${
          outOfStock
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : added
            ? "bg-emerald-700 text-white"
            : "bg-surface-200 text-ink hover:bg-ink hover:text-white"
        }`}
      >
        <Plus className="w-3 h-3" />
        {outOfStock ? "Agotado" : added ? "¡Listo!" : "Añadir"}
      </button>
    </Link>
  );
}
