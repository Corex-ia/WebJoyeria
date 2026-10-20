"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 96);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/productos",                        label: "Tienda" },
    { href: "/productos?cat=coleccion-primavera", label: "Primavera" },
    { href: "/productos?cat=coleccion-aurea",     label: "Aurea" },
    { href: "/productos?cat=coleccion-kids",      label: "Kids" },
    { href: "/acerca",                            label: "Nosotros" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-surface-300 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[96px]">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo-oasis.png"
                alt="Joyería Oasis"
                width={88}
                height={88}
                className="object-contain mix-blend-multiply"
                priority
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="label-u text-ink-soft hover:text-ink transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right: search + cart + hamburger */}
            <div className="flex items-center gap-5">
              <Link
                href="/buscar"
                className="p-1 text-ink hover:text-gold-500 transition-colors duration-200"
                aria-label="Buscar"
              >
                <Search className="w-[18px] h-[18px]" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="relative p-1 text-ink hover:text-gold-500 transition-colors duration-200"
                aria-label="Carrito"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {count() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-400 text-ink text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                    {count()}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-1 text-ink hover:text-gold-500 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-surface-300">
            <div className="px-6 py-6 space-y-5">
              <Link href="/" className="block label-u text-ink/70 py-1" onClick={() => setMobileOpen(false)}>
                Inicio
              </Link>
              <Link href="/acerca" className="block label-u text-ink/70 hover:text-gold-500 py-1 transition-colors" onClick={() => setMobileOpen(false)}>
                Nosotros
              </Link>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block label-u text-ink/70 hover:text-gold-500 py-1 transition-colors"
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
