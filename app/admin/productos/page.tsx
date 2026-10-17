import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/supabase";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug)")
    .order("created_at", { ascending: false });
  return (data as Product[]) ?? [];
}

export default async function AdminProductosPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Gestión</p>
          <h1
            className="font-serif text-ink"
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}
          >
            Productos
          </h1>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary text-sm px-5 py-2.5">
          + Nuevo producto
        </Link>
      </div>

      <div className="bg-white border border-surface-300 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-16 text-center">
            <div
              className="mx-auto mb-4 opacity-10"
              style={{ width: 48, height: 48, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
            />
            <p className="label-u text-ink-soft mt-4">No hay productos aún.</p>
            <Link href="/admin/productos/nuevo" className="label-u text-gold-500 hover:text-gold-400 transition-colors mt-3 inline-block">
              Crear el primer producto →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-300 bg-surface-100 text-left">
                  <th className="px-4 py-3 label-u text-ink-soft w-14"></th>
                  <th className="px-4 py-3 label-u text-ink-soft">Producto</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden md:table-cell">Categoría</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Precio</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden sm:table-cell">Stock</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Estado</th>
                  <th className="px-4 py-3 label-u text-ink-soft"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-300">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-100 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 overflow-hidden bg-surface-200 flex-shrink-0">
                        {p.thumbnail_url ? (
                          <Image
                            src={p.thumbnail_url}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gold-300 text-xs">◇</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink line-clamp-1">{p.name}</p>
                      <p className="label-u text-ink/25 mt-0.5" style={{ fontSize: "0.48rem" }}>{p.sku}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="label-u text-ink-soft">{p.category?.name ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gold-500">{formatCurrency(p.price)}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="label-u text-ink-soft">{p.stock ?? 0}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`label-u inline-block px-2 py-0.5 ${
                        p.status === "publish"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-surface-200 text-ink-soft"
                      }`}>
                        {p.status === "publish" ? "Activo" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/productos/${p.id}`}
                          className="label-u text-gold-500 hover:text-gold-400 transition-colors"
                        >
                          Editar
                        </Link>
                        <DeleteProductButton id={String(p.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
