"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Tag, Star, LogOut, Menu, X, Layers, FolderOpen, CreditCard } from "lucide-react";

const NAV = [
  { href: "/admin",             label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/productos",   label: "Productos",   icon: Package },
  { href: "/admin/categorias",  label: "Categorías",  icon: FolderOpen },
  { href: "/admin/colecciones", label: "Colecciones", icon: Layers },
  { href: "/admin/pedidos",     label: "Pedidos",     icon: ShoppingBag },
  { href: "/admin/cobros",      label: "Cobros",      icon: CreditCard },
  { href: "/admin/cupones",     label: "Cupones",     icon: Tag },
  { href: "/admin/resenas",     label: "Reseñas",     icon: Star },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "1") setAuthed(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
        const env = "Admin123";
    if (password === env) {
      sessionStorage.setItem("admin_auth", "1");
      setAuthed(true);
    } else {
      setError("Contraseña incorrecta");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-surface-200 flex items-center justify-center px-4">
        <div className="bg-white border border-surface-300 p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <Link href="/" tabIndex={-1}>
              <Image
                src="/images/logo-oasis.png"
                alt="Joyería Oasis"
                width={72}
                height={72}
                className="mx-auto mb-3 object-contain mix-blend-multiply hover:opacity-70 transition-opacity"
              />
            </Link>
            <h1
              className="font-serif text-ink text-xl"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
            >
              Joyería Oasis
            </h1>
            <p className="label-u text-ink-soft mt-1">Panel de administración</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label-u text-ink-soft block mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {error && <p className="label-u text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-ink text-white flex flex-col transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div
              className="flex-none opacity-50"
              style={{ width: 16, height: 16, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
            />
            <div>
              <div
                className="font-serif text-white text-sm"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
              >
                Joyería Oasis
              </div>
              <div className="label-u text-white/30" style={{ fontSize: "0.45rem" }}>Admin</div>
            </div>
          </Link>
          <button className="lg:hidden text-white/40 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-150 ${
                  active
                    ? "text-gold-400 bg-white/5"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-none" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-white hover:bg-white/5 w-full transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 flex-none" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-surface-300 h-14 flex items-center px-5 gap-3 sticky top-0 z-30">
          <button className="lg:hidden p-1 text-ink-soft hover:text-ink" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="label-u text-ink-soft hover:text-gold-500 transition-colors ml-auto">
            ← Ver tienda
          </Link>
        </header>
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
