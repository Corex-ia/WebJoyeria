"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/recurrente";
import type { Product } from "@/lib/supabase";

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.products ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-surface-100 pt-20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="label-u text-gold-500 mb-2">Buscar</p>
        <h1
          className="font-serif text-ink mb-8"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 400 }}
        >
          ¿Qué estás buscando?
        </h1>

        {/* Search input */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Aretes, anillos, collares..."
            className="w-full border border-surface-300 bg-white pl-12 pr-10 py-3.5 text-base text-ink focus:outline-none focus:border-gold-400 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white border border-surface-300 p-4 animate-pulse flex gap-4">
                <div className="w-16 h-16 bg-surface-200 flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-surface-200 rounded w-3/4" />
                  <div className="h-3 bg-surface-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && query.trim() && results.length === 0 && (
          <div className="text-center py-16">
            <p className="label-u text-ink-soft">No se encontraron productos para &ldquo;{query}&rdquo;</p>
            <Link href="/productos" className="label-u text-gold-500 hover:text-gold-400 mt-4 inline-block transition-colors">
              Ver todos los productos →
            </Link>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-3">
            <p className="label-u text-ink-soft mb-4">{results.length} resultado{results.length !== 1 ? "s" : ""}</p>
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/productos/${p.slug}`}
                className="flex gap-4 bg-white border border-surface-300 p-4 hover:border-gold-400 transition-colors group"
              >
                <div className="w-16 h-16 overflow-hidden bg-surface-200 flex-shrink-0">
                  {p.thumbnail_url ? (
                    <Image src={p.thumbnail_url} alt={p.name} width={64} height={64} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gold-300 text-lg">◇</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink group-hover:text-gold-500 transition-colors line-clamp-1">{p.name}</p>
                  {p.category && (
                    <p className="label-u text-ink-soft mt-0.5">{p.category.name}</p>
                  )}
                </div>
                <div className="text-sm font-medium text-gold-500 flex-shrink-0 self-center">
                  {formatCurrency(p.price)}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!query.trim() && (
          <div className="text-center py-12">
            <div
              className="mx-auto mb-6 opacity-10"
              style={{ width: 56, height: 56, border: "1px solid var(--gold)", transform: "rotate(45deg)" }}
            />
            <p className="label-u text-ink-soft">Escribe para buscar joyas</p>
          </div>
        )}
      </div>
    </div>
  );
}
