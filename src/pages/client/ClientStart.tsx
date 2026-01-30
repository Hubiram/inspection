import { useNavigate } from "react-router-dom";

export default function ClientStart() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-8">
        <h1 className="text-2xl font-semibold mb-2">Start Inspection</h1>
        <p className="text-gray-400 mb-6">
          Select section and valve type to proceed
        </p>

        <form className="space-y-6">
          {/* Section Dropdown */}
          <div>
            <label className="text-sm">
              <span className="text-red-500">*</span> Section
            </label>
            <select className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Select section</option>
              <option>Section 1</option>
              <option>Section 2</option>
              <option>Section 3</option>
            </select>
          </div>

          {/* Valve Type Dropdown */}
          <div>
            <label className="text-sm">
              <span className="text-red-500">*</span> Valve Type
            </label>
            <select className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Select valve type</option>
              <option>Gate Valve</option>
              <option>Ball Valve</option>
              <option>Globe Valve</option>
              <option>Butterfly Valve</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={() =>
              navigate("/client/inspection/Safety%20%26%20Accessibility")
            }
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-medium"
          >
            Start Inspection
          </button>
        </form>
      </div>
    </div>
  );
}
