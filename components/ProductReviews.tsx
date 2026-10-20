"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
}

interface Props {
  productId: string;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= (hover || value) ? "text-gold-400 fill-gold-400" : "text-ink/20"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author_name: "", author_email: "", rating: 0, body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?product_id=${productId}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []));
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.rating) { setError("Por favor selecciona una calificación"); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
      setShowForm(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSubmitting(false);
    }
  }

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="bg-surface-100 border-t border-surface-300 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="label-u text-gold-500 mb-1">Opiniones</p>
            <h2
              className="font-serif text-ink"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}
            >
              Reseñas del producto
            </h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                <StarRating value={Math.round(avg)} />
                <span className="label-u text-ink-soft">{avg.toFixed(1)} · {reviews.length} reseña{reviews.length !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
          {!submitted && (
            <button
              onClick={() => setShowForm((v) => !v)}
              className="btn-outline text-sm px-5 py-2"
            >
              {showForm ? "Cancelar" : "Escribir reseña"}
            </button>
          )}
        </div>

        {/* Review form */}
        {showForm && !submitted && (
          <form onSubmit={handleSubmit} className="bg-white border border-surface-300 p-6 mb-8 max-w-2xl">
            <div className="mb-4">
              <label className="label-u text-ink-soft block mb-2">Tu calificación *</label>
              <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label-u text-ink-soft block mb-1.5">Nombre *</label>
                <input
                  required
                  value={form.author_name}
                  onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
                  className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
              <div>
                <label className="label-u text-ink-soft block mb-1.5">Correo (opcional)</label>
                <input
                  type="email"
                  value={form.author_email}
                  onChange={(e) => setForm((f) => ({ ...f, author_email: e.target.value }))}
                  className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="label-u text-ink-soft block mb-1.5">Tu opinión *</label>
              <textarea
                required
                rows={4}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder="¿Qué te pareció el producto?"
                className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 resize-none"
              />
            </div>
            {error && <p className="label-u text-red-600 mb-3">{error}</p>}
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? "Enviando..." : "Publicar reseña"}
            </button>
          </form>
        )}

        {submitted && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 mb-8 max-w-2xl">
            <p className="label-u text-emerald-700">¡Gracias! Tu reseña fue enviada y será publicada tras revisión.</p>
          </div>
        )}

        {/* Reviews list */}
        {reviews.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="label-u text-ink-soft">Sé el primero en dejar una reseña.</p>
          </div>
        )}

        <div className="space-y-6 max-w-3xl">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-surface-300 p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium text-ink">{r.author_name}</p>
                  <p className="label-u text-ink/30 mt-0.5">
                    {new Date(r.created_at).toLocaleDateString("es-GT", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <StarRating value={r.rating} />
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
