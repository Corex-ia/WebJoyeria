"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/productos", label: "Tienda" },
    { href: "/productos?cat=coleccion-primavera", label: "Primavera" },
    { href: "/productos?cat=coleccion-aurea", label: "Aurea" },
    { href: "/productos?cat=coleccion-kids", label: "Kids" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream-50/95 backdrop-blur-md border-b border-cream-300 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none">
              <span
                className={`font-serif text-2xl font-light tracking-wide transition-colors duration-300 ${
                  scrolled ? "text-ink" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Joyería Oasis
              </span>
              <span
                className={`label-caps transition-colors duration-300 ${
                  scrolled ? "text-gold-500" : "text-gold-300"
                }`}
              >
                Oro 10k · Guatemala
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`label-caps transition-colors duration-300 hover:text-gold-400 ${
                    scrolled ? "text-ink/60" : "text-white/70"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Cart + Mobile toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className={`relative p-2 transition-colors duration-300 hover:text-gold-400 ${
                  scrolled ? "text-ink" : "text-white"
                }`}
                aria-label="Carrito"
              >
                <ShoppingBag className="w-5 h-5" />
                {count() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold-400 text-ink text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {count()}
                  </span>
                )}
              </button>
              <button
                className={`md:hidden p-2 transition-colors duration-300 ${
                  scrolled ? "text-ink" : "text-white"
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-cream-50/98 backdrop-blur-md border-t border-cream-300">
            <div className="px-6 py-6 space-y-4">
              <Link href="/" className="block label-caps text-ink/70 py-2" onClick={() => setMobileOpen(false)}>
                Inicio
              </Link>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block label-caps text-ink/70 hover:text-gold-500 py-2 transition-colors"
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
