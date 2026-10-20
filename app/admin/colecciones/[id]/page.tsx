"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function EditarColeccionPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then((d) => {
      const col = (d.categories ?? []).find((c: { id: number }) => String(c.id) === id);
      if (col) {
        setForm({ name: col.name, slug: col.slug, description: col.description ?? "" });
        if (col.image_url) setImagePreview(col.image_url);
      }
      setFetching(false);
    });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let image_url = imagePreview ?? "";
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        fd.append("product_slug", `coleccion-${form.slug}`);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error ?? "Error al subir imagen");
        image_url = uploadData.url;
      }
      const res = await fetch("/api/admin/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), ...form, image_url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al actualizar colección");
      router.push("/admin/colecciones");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <div className="text-ink-soft text-sm">Cargando...</div>;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="label-u text-gold-500 mb-1">Colecciones</p>
        <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
          Editar colección
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image upload */}
        <div>
          <p className="label-u text-ink-soft mb-3">Imagen de la colección</p>
          <div className="relative border-2 border-dashed border-surface-300 hover:border-gold-300 transition-colors cursor-pointer overflow-hidden"
            style={{ height: 220 }}
            onClick={() => document.getElementById("col-image")?.click()}
          >
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setImagePreview(null); setImageFile(null); }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-soft">
                <Upload className="w-8 h-8 opacity-40" />
                <p className="text-sm">Haz clic para cambiar imagen</p>
              </div>
            )}
          </div>
          <input id="col-image" type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </div>

        <div>
          <label className="label-u text-ink-soft block mb-2">Nombre *</label>
          <input
            name="name" value={form.name} onChange={handleChange} required
            className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
          />
        </div>

        <div>
          <label className="label-u text-ink-soft block mb-2">Slug (URL) *</label>
          <input
            name="slug" value={form.slug} onChange={handleChange} required
            className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors font-mono"
          />
          <p className="text-xs text-ink-soft mt-1">Se usa en la URL: /productos?cat={form.slug || "slug"}</p>
        </div>

        <div>
          <label className="label-u text-ink-soft block mb-2">Descripción (opcional)</label>
          <textarea
            name="description" value={form.description} onChange={handleChange} rows={3}
            className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary px-8 py-2.5">
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-ink-soft hover:text-ink transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
