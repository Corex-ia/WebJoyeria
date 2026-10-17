import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0">{children}</main>
      <MobileNav />

      <footer className="bg-ink text-white">
        {/* Top strip */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <p className="font-serif text-3xl font-light text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                Joyería Oasis
              </p>
              <span className="label-caps text-gold-400 block mb-6">Oro 10k · Guatemala</span>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Cada pieza que creamos lleva el sello de la artesanía guatemalteca — oro 10k trabajado con precisión y amor desde nuestro taller.
              </p>
            </div>

            {/* Colecciones */}
            <div>
              <p className="label-caps text-gold-500 mb-6">Colecciones</p>
              <ul className="space-y-3">
                {[
                  ["Tienda completa", "/productos"],
                  ["Primavera", "/productos?cat=coleccion-primavera"],
                  ["Aurea", "/productos?cat=coleccion-aurea"],
                  ["Kids", "/productos?cat=coleccion-kids"],
                  ["Aretes", "/productos?cat=aretes"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-white/50 hover:text-gold-400 text-sm transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <p className="label-caps text-gold-500 mb-6">Contacto</p>
              <ul className="space-y-3 text-sm text-white/50">
                <li>Guatemala, C.A.</li>
                <li>joyeriaoasis.com</li>
                <li className="pt-2 text-white/30">Envíos a todo el país</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-caps text-white/25">
            © {new Date().getFullYear()} Joyería Oasis — Todos los derechos reservados
          </p>
          <div className="flex items-center gap-1">
            <span className="block w-8 h-px bg-gold-700" />
            <span className="text-gold-700 text-xs mx-2">✦</span>
            <span className="block w-8 h-px bg-gold-700" />
          </div>
        </div>
      </footer>
    </>
  );
}
