import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white grid place-items-center shadow-sm">
          <Rocket className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Campus Taskboard</h1>
          <p className="text-sm text-gray-500">Kelola tugas kuliah dengan rapi dan fokus</p>
        </div>
      </div>
    </header>
  );
}
