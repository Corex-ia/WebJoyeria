"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import type { Category } from "@/lib/supabase";

export default function EditarProductoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Gallery state
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", regular_price: "", sale_price: "",
    sku: "", stock: "0", status: "publish", category_id: "", thumbnail_url: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch(`/api/admin/products/${id}`).then((r) => r.json()),
    ]).then(([catData, prodData]) => {
      setCategories(catData.categories ?? []);
      const p = prodData.product;
      if (p) {
        setForm({
          name: p.name ?? "",
          slug: p.slug ?? "",
          description: p.description ?? "",
          price: String(p.price ?? ""),
          regular_price: String(p.regular_price ?? ""),
          sale_price: String(p.sale_price ?? ""),
          sku: p.sku ?? "",
          stock: String(p.stock ?? 0),
          status: p.status ?? "publish",
          category_id: p.category_id ?? "",
          thumbnail_url: p.thumbnail_url ?? "",
        });
        if (p.thumbnail_url) setImagePreview(p.thumbnail_url);
        setGalleryUrls(Array.isArray(p.images) ? p.images : []);
      }
    });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleGalleryAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...previews]);
    e.target.value = "";
  }

  function removeExistingImage(idx: number) {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== idx));
  }

  function removeNewImage(idx: number) {
    URL.revokeObjectURL(galleryPreviews[idx]);
    setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  async function uploadGalleryFiles(): Promise<string[]> {
    const urls: string[] = [];
    for (const file of galleryFiles) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("product_slug", form.slug);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al subir imagen");
      urls.push(data.url);
    }
    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let thumbnail_url = form.thumbnail_url;
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        fd.append("product_slug", form.slug);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error ?? "Error al subir imagen");
        thumbnail_url = uploadData.url;
      }

      setUploadingGallery(true);
      const newGalleryUrls = await uploadGalleryFiles();
      setUploadingGallery(false);
      const images = [...galleryUrls, ...newGalleryUrls];

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          regular_price: form.regular_price ? parseFloat(form.regular_price) : null,
          sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
          stock: parseInt(form.stock),
          thumbnail_url,
          images,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al guardar");
      router.push("/admin/productos");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setUploadingGallery(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Editar producto</h1>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-800">
          ← Volver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Foto principal</label>
          <div className="flex items-start gap-4">
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center border-2 border-dashed border-gray-300">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" width={112} height={112} className="w-full h-full object-cover" unoptimized />
              ) : (
                <span className="text-3xl">📷</span>
              )}
            </div>
            <div>
              <input type="file" accept="image/*" onChange={handleImage} className="block text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100 cursor-pointer" />
              <p className="text-xs text-gray-400 mt-1.5">JPG, PNG o WebP. Máx 5 MB.</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Galería de imágenes adicionales</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {/* Existing saved images */}
            {galleryUrls.map((url, i) => (
              <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                <Image src={url} alt={`Imagen ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {/* New images (not yet uploaded) */}
            {galleryPreviews.map((url, i) => (
              <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-dashed border-gold-400 group">
                <Image src={url} alt={`Nueva ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => removeNewImage(i)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {/* Add button */}
            <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gold-400 hover:bg-gold-50 transition-colors">
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Agregar</span>
              <input type="file" accept="image/*" multiple onChange={handleGalleryAdd} className="hidden" />
            </label>
          </div>
          <p className="text-xs text-gray-400">Las imágenes con borde dorado se subirán al guardar.</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input name="name" required value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input name="slug" value={form.slug} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-mono" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea name="description" rows={4} value={form.description} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none" />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "price", label: "Precio de venta *", required: true },
            { name: "regular_price", label: "Precio regular", required: false },
            { name: "sale_price", label: "Precio oferta", required: false },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Q</span>
                <input name={f.name} type="number" step="0.01" min="0" required={f.required} value={form[f.name as keyof typeof form]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="0.00" />
              </div>
            </div>
          ))}
        </div>

        {/* SKU, Stock, Category, Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
            <input name="sku" value={form.sku} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="JO-001" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Stock (unidades disponibles)</label>
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">
              {parseInt(form.stock) <= 0
                ? "⚠ El producto aparecerá como Agotado"
                : `${form.stock} unidad${parseInt(form.stock) !== 1 ? "es" : ""} en inventario`}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Categoría</label>
            <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white">
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white">
              <option value="publish">Activo</option>
              <option value="draft">Borrador</option>
            </select>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-gold">
            {uploadingGallery ? "Subiendo imágenes..." : saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
