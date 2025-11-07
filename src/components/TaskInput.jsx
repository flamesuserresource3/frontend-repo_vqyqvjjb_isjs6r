import { useState } from "react";
import { Plus } from "lucide-react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, due: due || null });
    setTitle("");
    setDue("");
  };

  return (
    <form onSubmit={submit} className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tambahkan tugas baru…"
        className="w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white/70 px-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-indigo-700 active:scale-[0.99]"
      >
        <Plus className="h-5 w-5" />
        Tambah
      </button>
    </form>
  );
}
