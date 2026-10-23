"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ImageOff, AlertTriangle } from "lucide-react";
import type { Category } from "@/lib/supabase";

type CategoryWithCount = Category & { productCount: number };

export default function CategoriasPage() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const [catRes, prodRes] = await Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/admin/products").then((r) => r.json()),
    ]);
    const cats: Category[] = catRes.categories ?? [];
    const prods: { category_id: number | null }[] = prodRes.products ?? [];

    const countMap: Record<number, number> = {};
    for (const p of prods) {
      if (p.category_id) countMap[p.category_id] = (countMap[p.category_id] ?? 0) + 1;
    }

    setCategories(cats.map((c) => ({ ...c, productCount: countMap[c.id] ?? 0 })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: number, name: string, productCount: number) {
    const warning = productCount > 0
      ? `⚠ Esta categoría tiene ${productCount} producto${productCount !== 1 ? "s" : ""} asociado${productCount !== 1 ? "s" : ""}. Los productos quedarán sin categoría.\n\n¿Eliminar "${name}" de todas formas?`
      : `¿Eliminar la categoría "${name}"?`;
    if (!confirm(warning)) return;
    setDeleting(id);
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Catálogo</p>
          <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            Categorías
          </h1>
        </div>
        <Link href="/admin/categorias/nueva" className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nueva categoría
        </Link>
      </div>

      {loading ? (
        <div className="text-ink-soft text-sm">Cargando...</div>
      ) : categories.length === 0 ? (
        <div className="bg-white border border-surface-300 p-12 text-center">
          <p className="text-ink-soft text-sm mb-4">No hay categorías creadas aún.</p>
          <Link href="/admin/categorias/nueva" className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Crear primera categoría
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border border-surface-300 overflow-hidden group">
              <div className="relative h-40 bg-surface-200">
                {cat.image_url ? (
                  <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="w-8 h-8 text-ink/20" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-ink text-base truncate" style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                      {cat.name}
                    </p>
                    <p className="label-u text-ink-soft mt-0.5" style={{ fontSize: "0.55rem" }}>/{cat.slug}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="label-u text-ink-soft text-xs">
                        {cat.productCount} producto{cat.productCount !== 1 ? "s" : ""}
                      </span>
                      {cat.productCount > 0 && (
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-none">
                    <Link
                      href={`/admin/categorias/${cat.id}`}
                      className="p-1.5 text-ink-soft hover:text-ink transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name, cat.productCount)}
                      disabled={deleting === cat.id}
                      className="p-1.5 text-ink-soft hover:text-red-500 transition-colors disabled:opacity-40"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
