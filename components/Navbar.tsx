"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Tienda" },
    { href: "/productos?cat=coleccion-primavera", label: "Primavera" },
    { href: "/productos?cat=coleccion-kids", label: "Kids" },
    { href: "/productos?cat=coleccion-aurea", label: "Aurea" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-gold-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">💎</span>
              <div className="leading-tight">
                <div className="font-serif font-bold text-gold-700 text-lg">Joyería Oasis</div>
                <div className="text-xs text-gray-500 hidden sm:block">Oro 10k • Guatemala</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-gray-600 hover:text-gold-700 font-medium transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Cart */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gold-700 transition-colors"
                aria-label="Carrito"
              >
                <ShoppingBag className="w-6 h-6" />
                {count() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {count()}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gold-100 bg-white">
            <div className="px-4 py-3 space-y-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-2 text-sm text-gray-700 hover:text-gold-700 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}
