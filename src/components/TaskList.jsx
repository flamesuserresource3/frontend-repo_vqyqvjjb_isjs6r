import { CheckCircle2, Circle, Trash2, Clock } from "lucide-react";

function TaskItem({ task, onToggle, onDelete }) {
  const dueDate = task.due ? new Date(task.due) : null;
  const isOverdue = dueDate ? dueDate < new Date() && !task.done : false;

  return (
    <div className={`group flex items-center justify-between gap-3 rounded-xl border p-4 transition-colors ${task.done ? "bg-green-50/60 border-green-200" : "bg-white/70 border-gray-200 hover:border-indigo-300"}`}>
      <button
        onClick={() => onToggle(task.id)}
        className="shrink-0 text-indigo-600"
        aria-label={task.done ? "Tandai belum selesai" : "Tandai selesai"}
      >
        {task.done ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`truncate font-medium ${task.done ? "line-through text-gray-400" : "text-gray-900"}`}>{task.title}</p>
        {dueDate && (
          <div className="mt-1 flex items-center gap-2 text-xs">
            <Clock className={`h-4 w-4 ${isOverdue ? "text-red-500" : "text-gray-400"}`} />
            <span className={`${isOverdue ? "text-red-600" : "text-gray-500"}`}>
              Jatuh tempo: {dueDate.toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
        aria-label="Hapus tugas"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function TaskList({ tasks, onToggle, onDelete, filter }) {
  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  return (
    <div className="space-y-3">
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Belum ada tugas untuk kategori ini.
        </div>
      ) : (
        filtered.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
