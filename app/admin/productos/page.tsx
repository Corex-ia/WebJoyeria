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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Productos</h1>
        <Link href="/admin/productos/nuevo" className="btn-gold text-sm px-4 py-2">
          + Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="text-4xl mb-3">📦</div>
            <p className="font-medium">No hay productos aún.</p>
            <Link href="/admin/productos/nuevo" className="mt-4 inline-block text-gold-600 hover:underline text-sm">Crear el primer producto →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600 w-14"></th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Producto</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Categoría</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Precio</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Stock</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Estado</th>
                  <th className="px-4 py-3 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {p.thumbnail_url ? (
                          <Image src={p.thumbnail_url} alt={p.name} width={40} height={40} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">💎</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 line-clamp-1">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.sku}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600">{p.category?.name ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-gold-700">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{p.stock ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${p.status === "publish" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.status === "publish" ? "Activo" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/productos/${p.id}`} className="text-xs text-gold-600 hover:underline">Editar</Link>
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
