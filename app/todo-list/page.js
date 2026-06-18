"use client";
import ToolHeader from "@/components/layout/ToolHeader";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaListCheck,
  FaTrash,
  FaPen,
  FaCheck,
  FaRegCalendar,
  FaFlag,
} from "react-icons/fa6";
import { MdOutlinePending, MdOutlineTaskAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi2";

const STORAGE_KEY = "buitems_todo_list_v1";

const PRIORITY_STYLES = {
  high: {
    chip: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
  medium: {
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const emptyTask = () => ({
  id: Date.now() + Math.random(),
  text: "",
  priority: "medium",
  dueDate: "",
  completed: false,
  createdAt: new Date().toISOString(),
});

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // ---------- localStorage ----------
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load todos:", err);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to save todos:", err);
    }
  }, [tasks, hydrated]);

  // ---------- Actions ----------
  const addTask = useCallback(() => {
    if (!input.trim()) return;
    setTasks((prev) => [
      { ...emptyTask(), text: input.trim(), priority, dueDate },
      ...prev,
    ]);
    setInput("");
    setPriority("medium");
    setDueDate("");
  }, [input, priority, dueDate]);

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const removeTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editText.trim() } : t)),
    );
    setEditingId(null);
    setEditText("");
  };

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((t) => !t.completed));

  const clearAll = () => {
    if (confirm("Are you sure you want to delete ALL tasks?")) setTasks([]);
  };

  // ---------- Derived ----------
  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const pending = total - done;
    const high = tasks.filter(
      (t) => !t.completed && t.priority === "high",
    ).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, pending, high, percent };
  }, [tasks]);

  // ---------- Render ----------
  return (
    <section className="bg-blue-100">
      <div className="mx-auto px-4 py-10 max-w-3xl">
        <div className="justify-self-center w-full">
          <ToolHeader
            heading="To-Do List"
            desc="Plan your day, tasks are auto-saved to your browser (localStorage)"
          />

          {/* ===== Stat strip ===== */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatTile
              icon={<MdOutlineTaskAlt />}
              label="Total"
              value={stats.total}
              accent="text-blue-600"
            />
            <StatTile
              icon={<FaCheck />}
              label="Completed"
              value={stats.done}
              accent="text-emerald-600"
            />
            <StatTile
              icon={<MdOutlinePending />}
              label="Pending"
              value={stats.pending}
              accent="text-amber-600"
            />
            <StatTile
              icon={<FaFlag />}
              label="High Priority"
              value={stats.high}
              accent="text-rose-600"
            />
          </div>

          {/* ===== Add Task Card ===== */}
          <div className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <HiOutlineSparkles />
              </span>
              <div>
                <h2 className="font-semibold text-gray-800 leading-tight">
                  Add a New Task
                </h2>
                <p className="text-xs text-gray-500">
                  Set a priority and a due date to stay on top of things.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 sm:col-span-6">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Task
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="What needs to be done?"
                  className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              onClick={addTask}
              disabled={!input.trim()}
              className="mt-4 w-full py-2.5 navbar-bg text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              + Add Task
            </button>
          </div>

          {/* ===== Progress ===== */}
          {stats.total > 0 && (
            <div className="card mb-6 fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaListCheck className="text-blue-500" />
                  Progress
                </div>
                <span className="text-xs text-gray-500">
                  {stats.done} of {stats.total} completed
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 bg-blue-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${stats.percent}%` }}
                />
              </div>
              <p className="text-right text-xs font-medium text-gray-600 mt-1.5">
                {stats.percent}%
              </p>
            </div>
          )}

          {/* ===== Filter + Bulk ===== */}
          {stats.total > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="inline-flex p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
                {[
                  { key: "all", label: "All", count: stats.total },
                  { key: "active", label: "Active", count: stats.pending },
                  { key: "completed", label: "Completed", count: stats.done },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filter === f.key
                        ? "navbar-bg text-white shadow"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {f.label}
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        filter === f.key
                          ? "bg-white/20"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {stats.done > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="px-3 py-2 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  >
                    Clear Completed
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* ===== Tasks List ===== */}
          <div className="card">
            {!hydrated ? (
              <p className="text-center text-gray-400 py-10 text-sm">
                Loading your tasks…
              </p>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-14">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <FaListCheck size={28} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {filter === "completed"
                    ? "No completed tasks yet"
                    : filter === "active"
                      ? "Nothing pending"
                      : "Your list is empty"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {filter === "all"
                    ? "Add your first task above to get started."
                    : "Switch filter to view other tasks."}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredTasks.map((task) => {
                  const styles = PRIORITY_STYLES[task.priority];
                  return (
                    <li
                      key={task.id}
                      className={`group relative flex items-start gap-3 p-3 -mx-2 rounded-lg transition-all ${
                        task.completed ? "opacity-60" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Priority side bar */}
                      <span
                        className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${styles.dot}`}
                      />

                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-0.5 ml-2 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "border-gray-300 hover:border-blue-400 hover:scale-110"
                        }`}
                      >
                        {task.completed && <FaCheck size={10} />}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {editingId === task.id ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(task.id);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            autoFocus
                            className="w-full px-2 py-1 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        ) : (
                          <p
                            className={`text-sm font-medium break-words ${
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {task.text}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wide ${styles.chip}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}
                            />
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                              <FaRegCalendar size={9} />
                              {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        {editingId === task.id ? (
                          <>
                            <IconBtn
                              title="Save"
                              onClick={() => saveEdit(task.id)}
                              className="text-emerald-500 hover:bg-emerald-50"
                            >
                              <FaCheck size={12} />
                            </IconBtn>
                            <IconBtn
                              title="Cancel"
                              onClick={() => setEditingId(null)}
                              className="text-gray-400 hover:bg-gray-100"
                            >
                              <IoMdClose size={14} />
                            </IconBtn>
                          </>
                        ) : (
                          <>
                            <IconBtn
                              title="Edit"
                              disabled={task.completed}
                              onClick={() => startEdit(task)}
                              className="text-gray-400 hover:bg-blue-50 hover:text-blue-500"
                            >
                              <FaPen size={11} />
                            </IconBtn>
                            <IconBtn
                              title="Delete"
                              onClick={() => removeTask(task.id)}
                              className="text-gray-400 hover:bg-red-50 hover:text-red-500"
                            >
                              <FaTrash size={11} />
                            </IconBtn>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ===== Tip ===== */}
          <div className="card mt-6 border-l-4 border-blue-400">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-800">Note:</strong> Your tasks are
              saved locally in your browser using{" "}
              <code className="px-1.5 py-0.5 bg-gray-100 text-blue-600 rounded text-xs font-mono">
                localStorage
              </code>
              . They persist after refresh, but clearing site data or using a
              different browser/device will reset the list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI helpers ---------- */
function StatTile({ icon, label, value, accent }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
      <span
        className={`w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center ${accent}`}
      >
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium">
          {label}
        </p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function IconBtn({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
