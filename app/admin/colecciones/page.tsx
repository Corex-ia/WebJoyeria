"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ImageOff } from "lucide-react";
import type { Category } from "@/lib/supabase";

export default function ColeccionesPage() {
  const [collections, setCollections] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCollections(data.categories ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar la colección "${name}"? Los productos quedarán sin colección.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Catálogo</p>
          <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            Colecciones
          </h1>
        </div>
        <Link href="/admin/colecciones/nueva" className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nueva colección
        </Link>
      </div>

      {loading ? (
        <div className="text-ink-soft text-sm">Cargando...</div>
      ) : collections.length === 0 ? (
        <div className="bg-white border border-surface-300 p-12 text-center">
          <p className="text-ink-soft text-sm mb-4">No hay colecciones creadas aún.</p>
          <Link href="/admin/colecciones/nueva" className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Crear primera colección
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col) => (
            <div key={col.id} className="bg-white border border-surface-300 overflow-hidden group">
              <div className="relative h-40 bg-surface-200">
                {col.image_url ? (
                  <Image src={col.image_url} alt={col.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="w-8 h-8 text-ink/20" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-serif text-ink text-base" style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                      {col.name}
                    </p>
                    <p className="label-u text-ink-soft mt-0.5" style={{ fontSize: "0.55rem" }}>/{col.slug}</p>
                    {col.description && (
                      <p className="text-xs text-ink-soft mt-1 line-clamp-2">{col.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-none">
                    <Link
                      href={`/admin/colecciones/${col.id}`}
                      className="p-1.5 text-ink-soft hover:text-ink transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(col.id, col.name)}
                      disabled={deleting === col.id}
                      className="p-1.5 text-ink-soft hover:text-red-500 transition-colors"
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
