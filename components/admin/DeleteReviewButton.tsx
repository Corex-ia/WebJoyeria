"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteReviewButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function del() {
    if (!confirm("¿Eliminar esta reseña?")) return;
    setLoading(true);
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button onClick={del} disabled={loading}
      className="flex items-center gap-1.5 label-u text-red-500 hover:text-red-400 transition-colors disabled:opacity-40">
      <Trash2 className="w-3.5 h-3.5" />
      {loading ? "..." : "Eliminar"}
    </button>
  );
}
