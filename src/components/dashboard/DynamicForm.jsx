"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const inputClass =
  "w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/60";

// Converts a raw record (from the API) into form-editable state — arrays
// of strings become comma-joined text for the "tags" field type.
function toFormState(fields, initial = {}) {
  const state = {};
  for (const field of fields) {
    if (field.type === "preset-picker") continue;
    if (field.type === "tags") {
      state[field.name] = (initial[field.name] || []).join(", ");
    } else if (field.type === "list") {
      state[field.name] = initial[field.name]?.length ? initial[field.name] : [{}];
    } else {
      state[field.name] = initial[field.name] ?? "";
    }
  }
  return state;
}

// Converts form state back into the shape the API expects before submit.
function toPayload(fields, state) {
  const payload = {};
  for (const field of fields) {
    if (field.type === "preset-picker") continue;
    if (field.type === "tags") {
      payload[field.name] = state[field.name]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (field.type === "number") {
      payload[field.name] = state[field.name] === "" ? 0 : Number(state[field.name]);
    } else if (field.type === "list") {
      payload[field.name] = (state[field.name] || []).filter((item) =>
        Object.values(item).some((v) => v && v.toString().trim())
      );
    } else {
      payload[field.name] = state[field.name];
    }
  }
  return payload;
}

export default function DynamicForm({ fields, initialData, onSubmit, onCancel, submitting }) {
  const [formState, setFormState] = useState(() => toFormState(fields, initialData));
  const [formError, setFormError] = useState("");

  const setValue = (name, value) => setFormState((prev) => ({ ...prev, [name]: value }));

  const setListItem = (name, index, itemField, value) => {
    setFormState((prev) => {
      const list = [...prev[name]];
      list[index] = { ...list[index], [itemField]: value };
      return { ...prev, [name]: list };
    });
  };

  const addListItem = (name) =>
    setFormState((prev) => ({ ...prev, [name]: [...prev[name], {}] }));

  const removeListItem = (name, index) =>
    setFormState((prev) => ({ ...prev, [name]: prev[name].filter((_, i) => i !== index) }));

  const applyPreset = (targetFields, preset) => {
    setFormState((prev) => {
      const next = { ...prev };
      targetFields.forEach((fieldName) => {
        if (preset[fieldName] !== undefined) next[fieldName] = preset[fieldName];
      });
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = fields.find(
      (f) => f.required && f.type === "icon" && !formState[f.name]
    );
    if (missing) {
      setFormError(`Please select ${missing.label}.`);
      return;
    }
    setFormError("");
    onSubmit(toPayload(fields, formState));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {formError}
        </div>
      )}
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            {field.label}
            {field.required && <span className="text-red-400"> *</span>}
          </label>

          {field.type === "textarea" && (
            <textarea
              className={inputClass}
              rows={3}
              required={field.required}
              value={formState[field.name]}
              onChange={(e) => setValue(field.name, e.target.value)}
            />
          )}

          {["text", "url", "number"].includes(field.type) && (
            <input
              type={field.type === "number" ? "number" : "text"}
              className={inputClass}
              placeholder={field.placeholder}
              required={field.required}
              value={formState[field.name]}
              onChange={(e) => setValue(field.name, e.target.value)}
            />
          )}

          {field.type === "tags" && (
            <input
              type="text"
              className={inputClass}
              placeholder="item one, item two, item three"
              value={formState[field.name]}
              onChange={(e) => setValue(field.name, e.target.value)}
            />
          )}

          {field.type === "preset-picker" && (
            <div className="flex flex-wrap gap-2">
              {field.options.map((preset) => (
                <button
                  type="button"
                  key={preset.key}
                  onClick={() => applyPreset(field.targetFields, preset)}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-xs text-gray-300 hover:border-cyan-400 hover:text-cyan-300"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {field.type === "icon" && (
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 bg-[#111] border border-white/10 rounded-lg p-3">
              {field.options.map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  title={opt.label}
                  onClick={() => setValue(field.name, opt.key)}
                  className={`text-[10px] py-2 rounded-md border transition-colors ${
                    formState[field.name] === opt.key
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {field.type === "list" && (
            <div className="space-y-2">
              {formState[field.name].map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {field.itemFields.map((itemField) => (
                      <input
                        key={itemField.name}
                        type="text"
                        className={inputClass}
                        placeholder={itemField.label}
                        value={item[itemField.name] || ""}
                        onChange={(e) =>
                          setListItem(field.name, index, itemField.name, e.target.value)
                        }
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeListItem(field.name, index)}
                    className="p-2 text-gray-500 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(field.name)}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
              >
                <Plus size={14} /> Add another
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
