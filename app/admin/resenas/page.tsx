import { supabaseAdmin } from "@/lib/supabase";
import ApproveReviewButton from "@/components/admin/ApproveReviewButton";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";

interface Review {
  id: string;
  product_id: string;
  author_name: string;
  author_email: string | null;
  rating: number;
  body: string;
  approved: boolean;
  created_at: string;
  product: { name: string } | null;
}

async function getReviews(): Promise<Review[]> {
  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("product_reviews")
    .select("*, product:products(name)")
    .order("created_at", { ascending: false });
  return (data as Review[]) ?? [];
}

export default async function ResenasPage() {
  const reviews = await getReviews();
  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  function StarDisplay({ rating }: { rating: number }) {
    return (
      <span className="text-gold-400">
        {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      </span>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="label-u text-gold-500 mb-1">Moderación</p>
        <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
          Reseñas de productos
        </h1>
        <p className="label-u text-ink-soft mt-1">{pending.length} pendiente{pending.length !== 1 ? "s" : ""} de aprobación</p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="label-u text-ink mb-4">Pendientes de aprobación</h2>
          <div className="space-y-4">
            {pending.map((r) => (
              <div key={r.id} className="bg-white border border-amber-200 p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="font-medium text-sm text-ink">{r.author_name}</span>
                      <StarDisplay rating={r.rating} />
                      <span className="label-u text-ink-soft">{r.product?.name ?? "Producto"}</span>
                    </div>
                    <p className="text-sm text-ink-soft leading-relaxed">{r.body}</p>
                    <p className="label-u text-ink/30 mt-2">
                      {new Date(r.created_at).toLocaleString("es-GT")}
                      {r.author_email && ` · ${r.author_email}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <ApproveReviewButton id={r.id} />
                    <DeleteReviewButton id={r.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <div>
          <h2 className="label-u text-ink mb-4">Aprobadas ({approved.length})</h2>
          <div className="bg-white border border-surface-300 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-300 bg-surface-100 text-left">
                  <th className="px-4 py-3 label-u text-ink-soft">Autor</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden md:table-cell">Producto</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Rating</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden sm:table-cell">Reseña</th>
                  <th className="px-4 py-3 label-u text-ink-soft"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-300">
                {approved.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-100 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{r.author_name}</p>
                      <p className="label-u text-ink/30 mt-0.5">{new Date(r.created_at).toLocaleDateString("es-GT")}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="label-u text-ink-soft">{r.product?.name ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StarDisplay rating={r.rating} />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-sm text-ink-soft line-clamp-1 max-w-xs">{r.body}</p>
                    </td>
                    <td className="px-4 py-3">
                      <DeleteReviewButton id={r.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="p-16 text-center bg-white border border-surface-300">
          <p className="label-u text-ink-soft">Aún no hay reseñas.</p>
        </div>
      )}
    </div>
  );
}
