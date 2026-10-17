"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/supabase";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, setOpen } = useCart();
  const [added, setAdded] = useState(false);

  function handle() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setOpen(true);
  }

  const inStock = (product.stock ?? 0) > 0;

  return (
    <button
      onClick={handle}
      disabled={!inStock}
      className={`btn-gold w-full justify-center text-base py-4 ${
        !inStock ? "opacity-50 cursor-not-allowed" : ""
      } ${added ? "bg-green-600 hover:bg-green-600" : ""}`}
    >
      <ShoppingBag className="w-5 h-5" />
      {added ? "¡Agregado al carrito!" : inStock ? "Agregar al carrito" : "Sin stock"}
    </button>
  );
}
