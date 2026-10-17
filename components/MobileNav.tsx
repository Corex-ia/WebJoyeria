"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function MobileNav() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();

  const items = [
    { href: "/",          icon: Home,      label: "Inicio" },
    { href: "/productos", icon: Grid3X3,   label: "Tienda" },
    { href: "/productos", icon: Search,    label: "Buscar" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-md border-t border-cream-300 safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors duration-200 ${
                active ? "text-gold-500" : "text-ink/40"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[0.55rem] tracking-widest uppercase font-medium">{label}</span>
            </Link>
          );
        })}

        {/* Cart */}
        <button
          onClick={() => setOpen(true)}
          className="relative flex flex-col items-center justify-center gap-0.5 text-ink/40 hover:text-gold-500 transition-colors duration-200"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[0.55rem] tracking-widest uppercase font-medium">Carrito</span>
          {count() > 0 && (
            <span className="absolute top-2 right-6 bg-gold-400 text-ink text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {count()}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
