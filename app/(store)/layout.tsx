import Navbar from "@/components/Navbar";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="bg-dark text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💎</span>
                <span className="font-serif font-bold text-gold-400 text-lg">Joyería Oasis</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fabricamos joyas de oro 10k en Guatemala. Cada pieza es única, hecha con amor y los mejores materiales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gold-400 mb-3">Colecciones</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/productos" className="hover:text-gold-400 transition-colors">Toda la tienda</a></li>
                <li><a href="/productos?cat=coleccion-primavera" className="hover:text-gold-400 transition-colors">Primavera</a></li>
                <li><a href="/productos?cat=coleccion-kids" className="hover:text-gold-400 transition-colors">Kids</a></li>
                <li><a href="/productos?cat=coleccion-aurea" className="hover:text-gold-400 transition-colors">Aurea</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gold-400 mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Guatemala, C.A.</li>
                <li>joyeriaoasis.com</li>
                <li>Envíos a todo el país</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} Joyería Oasis. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
