"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { dashboardApi } from "../lib/dashboardApi";
import DynamicForm from "./DynamicForm";

export default function ResourceManager({ config }) {
  const { resource, label, fields, tableColumns } = config;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = "add" mode
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await dashboardApi.list(resource);
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const openAdd = () => {
    setError("");
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setError("");
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      if (editingItem) {
        await dashboardApi.update(resource, editingItem._id, payload);
      } else {
        await dashboardApi.create(resource, payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Delete this ${label.toLowerCase()} item? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await dashboardApi.remove(resource, id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">{label}</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              {tableColumns.map((col) => (
                <th key={col} className="text-left px-4 py-3 font-medium">
                  {col}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={tableColumns.length + 1} className="text-center py-8 text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={tableColumns.length + 1} className="text-center py-8 text-gray-500">
                  No {label.toLowerCase()} yet. Click "Add New" to create one.
                </td>
              </tr>
            )}
            {!loading &&
              items.map((item) => (
                <tr key={item._id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  {tableColumns.map((col) => (
                    <td key={col} className="px-4 py-3 text-gray-300 max-w-xs truncate">
                      {String(item[col] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-cyan-400 hover:bg-white/5"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-white/5 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0c0f0f] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {editingItem ? `Edit ${label}` : `Add ${label}`}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            {error && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
            <DynamicForm
              fields={fields}
              initialData={editingItem || {}}
              onSubmit={handleSubmit}
              onCancel={() => setModalOpen(false)}
              submitting={submitting}
            />
          </div>
        </div>
      )}
    </div>
  );
}
