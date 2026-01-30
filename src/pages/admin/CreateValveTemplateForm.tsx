/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CreateValveTemplateForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input label="SL. No." required />
        <Input label="Tag No." required />

        <div className="col-span-2">
          <Input label="Valve" required />
        </div>

        <Input label="Valve Code" required />
        <Select label="Valve Type" required />

        <Input label="Function" required />
        <Input label="Application" required />

        <Input label="V. Model" required />
        <DateInput label="V. Manufactured" required />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
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


function Input({ label, required }: any) {
  return (
    <div>
      <label className="text-sm">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <input className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
    </div>
  );
}

function Select({ label, required }: any) {
  return (
    <div>
      <label className="text-sm">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <select className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2">
        <option>Select type</option>
        <option>Gate Valve</option>
        <option>Ball Valve</option>
        <option>Globe Valve</option>
      </select>
    </div>
  );
}

function DateInput({ label, required }: any) {
  return (
    <div>
      <label className="text-sm">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <input
        type="date"
        className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2"
      />
    </div>
  );
}
