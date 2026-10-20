"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function ApproveReviewButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function approve() {
    setLoading(true);
    await fetch(`/api/admin/reviews/${id}`, { method: "PATCH", body: JSON.stringify({ approved: true }), headers: { "Content-Type": "application/json" } });
    router.refresh();
    setLoading(false);
  }

  return (
    <button onClick={approve} disabled={loading}
      className="flex items-center gap-1.5 label-u text-emerald-700 hover:text-emerald-600 transition-colors disabled:opacity-40">
      <Check className="w-3.5 h-3.5" />
      {loading ? "..." : "Aprobar"}
    </button>
  );
}
