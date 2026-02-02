import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const checklistFlow = [
  {
    category: "Safety & Accessibility",
    questions: [
      { id: "q1", text: "Is the valve easily accessible?" },
      { id: "q2", text: "Are safety guards installed?" },
    ],
  },
  {
    category: "External Condition",
    questions: [{ id: "q3", text: "Is there visible corrosion?" }],
  },
];

export default function MobileInspection() {
  const navigate = useNavigate();

  const questions = checklistFlow.flatMap((section) =>
    section.questions.map((q) => ({
      ...q,
      category: section.category,
    })),
  );

  const [index, setIndex] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeAttachment = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const current = questions[index];
  const isLast = index === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-gray-800/40 backdrop-blur">
        <span className="text-sm font-medium text-white/80">
          {current.category}
        </span>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs leading-tight">
            <div className="font-medium">Performer</div>
            <div className="text-white/60">performer@performance.com</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20" />
        </div>
      </header>

      {/* Back Button */}
      {index > 0 && (
        <button
          onClick={() => {
            setRemarks("");
            setIndex((i) => i - 1);
          }}
          className="px-4 pt-4 text-sm text-white/60 w-fit"
        >
          ← Back
        </button>
      )}

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800/70 backdrop-blur border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">{current.text}</h2>

            {/* Yes / No */}
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-primary">Yes</button>
              <button className="btn-secondary">No</button>
            </div>

            {/* Remarks */}
            <div>
              <label className="text-sm text-white/60">
                Remarks (optional)
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="mt-2 w-full bg-gray-800/60 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Attachment */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary w-full"
            >
              + Add Attachment
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setAttachments((prev) => [...prev, ...files]);
              }}
              style={{ display: "none" }}
            />
            {attachments.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm text-white/60">Attachments:</label>
                <ul className="space-y-1">
                  {attachments.map((file, idx) => (
                    <li key={idx} className="flex items-center justify-between text-sm text-white/80">
                      <span>{file.name}</span>
                      <button
                        onClick={() => removeAttachment(idx)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          {!isLast ? (
            <button
              onClick={() => {
                setRemarks("");
                setIndex((i) => i + 1);
              }}
              className="btn-primary w-full mt-6"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="btn-primary w-full mt-6"
            >
              Submit Inspection
            </button>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-gray-800/80 border border-white/10 rounded-xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">Inspection Completed</h3>

            <button
              onClick={() => navigate("/")}
              className="btn-primary w-full"
            >
              Confirm Inspection
            </button>

            <button className="btn-secondary w-full">Export Report</button>

            <button
              onClick={() => setShowConfirm(false)}
              className="w-full text-sm text-white/60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
