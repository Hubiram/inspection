import { useState } from "react";
import { checklistConfig, type ChecklistCategory } from "../../data/checklistConfig";

const BASE_CATEGORIES: ChecklistCategory[] = [
  "Safety & Accessibility",
  "External Condition",
  "Leakage Check",
  "Operation & Function",
  "Stem, Bonnet & Packing",
  "Actuator / Operator",
];

export default function ChecklistSetup() {
  const [customItem, setCustomItem] = useState("");
  const [valveType, setValveType] = useState("Gate Valve");
  const [selected, setSelected] = useState<ChecklistCategory[]>(
    checklistConfig.find((v) => v.valveType === valveType)?.categories || [],
  );

  const toggleCategory = (cat: ChecklistCategory) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-3xl">
      <h1 className="text-xl font-semibold mb-6">Checklist Setup</h1>

      {/* Valve Type */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Valve Type</label>
        <select
          value={valveType}
          onChange={(e) => {
            const type = e.target.value;
            setValveType(type);
            setSelected(
              checklistConfig.find((v) => v.valveType === type)?.categories ||
                [],
            );
          }}
          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
        >
          <option>Gate Valve</option>
          <option>Ball Valve</option>
        </select>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {[
          ...BASE_CATEGORIES,
          ...selected.filter((c) => !BASE_CATEGORIES.includes(c)),
        ].map((cat) => (
          <label
            key={cat}
            className="flex items-center justify-between gap-3 text-sm bg-white/5 px-4 py-3 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </div>

            {!BASE_CATEGORIES.includes(cat) && (
              <button
                onClick={() =>
                  setSelected((prev) => prev.filter((c) => c !== cat))
                }
                className="text-red-400 text-xs hover:underline"
              >
                Remove
              </button>
            )}
          </label>
        ))}
      </div>

      {/* Add Custom Checklist Item */}
      <div className="mt-6">
        <label className="block text-sm mb-2">Add Custom Checklist Item</label>

        <div className="flex gap-3">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder="e.g. Fire Safety Compliance"
            className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2"
          />

          <button
            onClick={() => {
              if (customItem.trim() && !selected.includes(customItem.trim())) {
                setSelected((prev) => [...prev, customItem.trim()]);
                setCustomItem("");
              }
            }}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
        Save Checklist
      </button>
    </div>
  );
}
