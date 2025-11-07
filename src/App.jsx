import { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import StatsBar from "./components/StatsBar";

function useLocalTasks(key = "tasks") {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch {}
  }, [tasks, key]);

  return [tasks, setTasks];
}

export default function App() {
  const [tasks, setTasks] = useLocalTasks("campus_tasks");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const addTask = ({ title, due }) => {
    const id = crypto.randomUUID();
    setTasks((t) => [{ id, title, done: false, due }, ...t]);
  };

  const toggleTask = (id) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  };

  const deleteTask = (id) => {
    setTasks((t) => t.filter((x) => x.id !== id));
  };

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filter === "active" && t.done) return false;
      if (filter === "completed" && !t.done) return false;
      if (q && !t.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tasks, filter, query]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const within7days = tasks.filter((t) => {
      if (!t.due) return false;
      const now = new Date();
      const due = new Date(t.due);
      const diff = (due - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7 && !t.done;
    }).length;
    return { total, completed, upcoming: within7days };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="max-w-3xl mx-auto">
        <Header />

        <main className="px-6 md:px-8 pb-16 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
              <div className="flex-1">
                <TaskInput onAdd={addTask} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4">
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                {[
                  { id: "all", label: "Semua" },
                  { id: "active", label: "Aktif" },
                  { id: "completed", label: "Selesai" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      filter === f.id
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari tugas…"
                className="flex-1 min-w-[200px] rounded-lg border border-gray-200 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-5">
              <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                filter={filter}
              />
            </div>
          </div>

          <StatsBar total={stats.total} completed={stats.completed} upcoming={stats.upcoming} />

          <section className="rounded-2xl border border-gray-200 bg-white/70 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Tips Produktivitas</h2>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Gunakan kategori filter untuk fokus pada tugas aktif.</li>
              <li>Tambahkan tanggal jatuh tempo agar tidak terlewat.</li>
              <li>Tandai tugas selesai untuk melihat progres harian.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
