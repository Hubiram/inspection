/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface ValveEntry {
  valveCode: string;
  tagNo: string;
}

export default function CreateSectionForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [valves, setValves] = useState<ValveEntry[]>([
    { valveCode: "", tagNo: "" },
  ]);

  const addValve = () => {
    setValves([...valves, { valveCode: "", tagNo: "" }]);
  };

  const removeValve = (index: number) => {
    setValves(valves.filter((_, i) => i !== index));
  };

  const updateValve = (
    index: number,
    field: keyof ValveEntry,
    value: string,
  ) => {
    const updated = [...valves];
    updated[index][field] = value;
    setValves(updated);
  };

  return (
    <form className="space-y-6">
      {/* Section Name */}
      <Input label="Section Name" required />

      {/* Section Icon */}
      <div>
        <label className="text-sm">
          <span className="text-red-500">*</span> Section Icon
        </label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-300
            file:mr-4 file:rounded-lg file:border-0
            file:bg-white/10 file:px-4 file:py-2
            hover:file:bg-white/20"
        />
      </div>

      {/* Valves List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Valves in this Section</h3>

        {valves.map((valve, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                label="Valve Code"
                value={valve.valveCode}
                onChange={(e: any) =>
                  updateValve(index, "valveCode", e.target.value)
                }
              />
            </div>
            <div className="flex-1">
              <Input
                label="Tag No."
                value={valve.tagNo}
                onChange={(e: any) => updateValve(index, "tagNo", e.target.value)}
              />
            </div>
            {valves.length > 1 && (
              <button
                type="button"
                onClick={() => removeValve(index)}
                className="text-red-500 hover:text-red-700 transition text-xl font-bold ml-2"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addValve}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition"
        >
          + Add Valve
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm">Notes</label>
        <textarea
          rows={3}
          className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

/* ---------- Reusable Input ---------- */

function Input({ label, required, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
