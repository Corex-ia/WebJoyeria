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

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setOpen(true);
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;

  return (
    <Link href={`/productos/${product.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gold-50">
              💎
            </div>
          )}
          {hasDiscount && (
            <span className="absolute top-2 left-2 badge bg-red-500 text-white">
              Oferta
            </span>
          )}
          {product.category?.name && (
            <span className="absolute top-2 right-2 badge bg-gold-100 text-gold-800">
              {product.category.name}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-gold-700">
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.regular_price!)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`mt-3 w-full text-sm font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              added
                ? "bg-green-500 text-white"
                : "bg-gold-50 text-gold-700 hover:bg-gold-600 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {added ? "¡Agregado!" : "Agregar"}
          </button>
        </div>
      </div>
    </Link>
  );
}
