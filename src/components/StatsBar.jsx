import { CheckCircle2, ListChecks, Clock } from "lucide-react";

export default function StatsBar({ total, completed, upcoming }) {
  const active = total - completed;
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl border border-gray-200 bg-white/70 p-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <ListChecks className="h-4 w-4" /> Total
        </div>
        <div className="mt-1 text-2xl font-semibold text-gray-900">{total}</div>
        <div className="text-xs text-gray-500">{active} aktif</div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white/70 p-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <CheckCircle2 className="h-4 w-4" /> Selesai
        </div>
        <div className="mt-1 text-2xl font-semibold text-emerald-600">{completed}</div>
        <div className="text-xs text-gray-500">Bagus! tetap konsisten</div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white/70 p-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock className="h-4 w-4" /> Dekat Deadline
        </div>
        <div className="mt-1 text-2xl font-semibold text-amber-600">{upcoming}</div>
        <div className="text-xs text-gray-500">7 hari ke depan</div>
      </div>
    </div>
  );
}
