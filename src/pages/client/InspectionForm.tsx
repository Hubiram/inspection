/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useState } from "react";
import { inspectionQuestions } from "../../data/inspectionQuestions";
import { useEffect } from "react";

export default function InspectionForm() {
    const { section } = useParams();
    const decodedSection = decodeURIComponent(section || "");
    const questions = inspectionQuestions[decodedSection] || [];const [tagNo, settagNo] = useState("");
    const [answers, setAnswers] = useState<Record<string, any>>({});

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers({});
    }, [decodedSection]);

    return (
      <div className="w-full max-w-xl bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold">
            {decodedSection} Inspection Form
          </h1>
          <button className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
            Export
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Tag No.</label>
          <select
            value={tagNo}
            onChange={(e) => settagNo(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
          >
            <option value="" defaultValue={"true"}>
              Select Tag No.
            </option>
            <option value="TAG-1001">TAG-1001</option>
            <option value="TAG-1002">TAG-1002</option>
            <option value="TAG-1003">TAG-1003</option>
          </select>
        </div>

        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm mb-2">{q.label}</label>

              {/* YES / NO */}
              {q.type === "yesno" && (
                <div className="flex gap-6">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === option}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: option,
                          }))
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {/* SELECT */}
              {q.type === "select" && (
                <select
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
                >
                  <option value="">Select</option>
                  {q.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {/* TEXT */}
              {q.type === "text" && (
                <input
                  type="text"
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
                />
              )}

              {/* TEXTAREA */}
              {q.type === "textarea" && (
                <textarea
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
                />
              )}
            </div>
          ))}

          {/* ACTIONS */}
          <div className="flex justify-between pt-4">
            <div>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-300
            file:mr-4 file:rounded-lg file:border-0
            file:bg-white/10 file:px-4 file:py-2
            hover:file:bg-white/20"
              />
            </div>

            <div className="flex gap-3">
              <button className="border border-white/10 px-4 py-2 rounded-lg">
                Export
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}