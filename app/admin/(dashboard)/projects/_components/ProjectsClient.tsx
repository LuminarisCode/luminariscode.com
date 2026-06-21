"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, ExternalLink, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  name: string;
  categoryEn: string;
  categoryId: string;
  descriptionEn: string;
  descriptionId: string;
  image: string | null;
  gradient: string;
  technologies: string[];
  status: string;
  demoUrl: string | null;
  order: number;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
];

const EMPTY: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  categoryEn: "",
  categoryId: "",
  descriptionEn: "",
  descriptionId: "",
  image: "",
  gradient: GRADIENTS[0],
  technologies: [],
  status: "Active",
  demoUrl: "",
  order: 0,
  published: true,
};

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-all";
const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";

export default function ProjectsClient({ initialData }: { initialData: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const openAdd = () => {
    setForm(EMPTY);
    setTechInput("");
    setEditing(null);
    setModal("add");
  };

  const openEdit = (p: Project) => {
    setForm({ ...p, image: p.image ?? "", demoUrl: p.demoUrl ?? "" });
    setTechInput(p.technologies.join(", "));
    setEditing(p);
    setModal("edit");
  };

  const closeModal = () => { setModal(null); setEditing(null); };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      technologies: techInput.split(",").map((t) => t.trim()).filter(Boolean),
      image: form.image || null,
      demoUrl: form.demoUrl || null,
    };
    try {
      if (modal === "add") {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setProjects((prev) => [...prev, created].sort((a, b) => a.order - b.order));
      } else {
        const res = await fetch(`/api/admin/projects/${editing!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)).sort((a, b) => a.order - b.order)
        );
      }
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const togglePublished = async (p: Project) => {
    const res = await fetch(`/api/admin/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, published: !p.published }),
    });
    const updated = await res.json();
    setProjects((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} total projects</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Table — scrollable on mobile */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                  #
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Pub
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Demo
                </th>
                <th className="px-4 py-3.5 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-700/20 transition-colors">
                  <td className="px-4 py-3.5 text-xs text-gray-600 font-mono">{p.order}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-white text-sm">{p.name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-400 hidden md:table-cell">
                    {p.categoryEn}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
                        p.status === "Active"
                          ? "bg-green-500/15 text-green-400"
                          : p.status === "Beta"
                          ? "bg-yellow-500/15 text-yellow-400"
                          : "bg-gray-500/15 text-gray-400"
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => togglePublished(p)}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors",
                        p.published
                          ? "text-green-400 hover:bg-green-500/10"
                          : "text-gray-600 hover:bg-gray-700"
                      )}
                    >
                      {p.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    {p.demoUrl ? (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-gray-700">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deleting === p.id}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      >
                        {deleting === p.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {projects.length === 0 && (
          <div className="py-16 text-center text-gray-600 text-sm">
            No projects yet. Click &quot;Add Project&quot; to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="font-bold text-white">
                {modal === "add" ? "Add Project" : "Edit Project"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Project Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Edupiere"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Category (EN) *</label>
                  <input
                    value={form.categoryEn}
                    onChange={(e) => setForm({ ...form, categoryEn: e.target.value })}
                    placeholder="School ERP Platform"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Category (ID) *</label>
                  <input
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    placeholder="Platform ERP Sekolah"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Description (EN) *</label>
                  <textarea
                    rows={3}
                    value={form.descriptionEn}
                    onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                    placeholder="English description..."
                    className={cn(inputCls, "resize-none")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Description (ID) *</label>
                  <textarea
                    rows={3}
                    value={form.descriptionId}
                    onChange={(e) => setForm({ ...form, descriptionId: e.target.value })}
                    placeholder="Deskripsi dalam bahasa Indonesia..."
                    className={cn(inputCls, "resize-none")}
                  />
                </div>
                <div>
                  <label className={labelCls}>Image Path</label>
                  <input
                    value={form.image ?? ""}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/project/edupiere.png"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Gradient (fallback)</label>
                  <select
                    value={form.gradient}
                    onChange={(e) => setForm({ ...form, gradient: e.target.value })}
                    className={inputCls}
                  >
                    {GRADIENTS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Technologies (comma-separated)</label>
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Next.js, TypeScript, PostgreSQL"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className={inputCls}
                  >
                    <option>Active</option>
                    <option>Beta</option>
                    <option>Coming Soon</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Demo URL</label>
                  <input
                    value={form.demoUrl ?? ""}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className={inputCls}
                  />
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="pub"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 accent-indigo-600"
                  />
                  <label htmlFor="pub" className="text-sm text-gray-300">
                    Published (visible on site)
                  </label>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-800">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-all"
              >
                {saving ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                ) : (
                  "Save Project"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
