import { useState } from "react";
import { QUESTION_TYPES } from "../../data/questionTypes";

interface QuestionDraft {
  id: string;
  text: string;
  type: string;
}

export default function QuestionFormSetup() {
  const [valveType, setValveType] = useState("Gate Valve");
  const [section, setSection] = useState("Safety & Accessibility");
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: "",
        type: "Yes / No",
      },
    ]);
  };

  const updateQuestion = (
    id: string,
    field: "text" | "type",
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Question Form Setup</h1>

      {/* Valve Type */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Valve Type</label>
        <select
          value={valveType}
          onChange={(e) => setValveType(e.target.value)}
          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
        >
          <option>Gate Valve</option>
          <option>Ball Valve</option>
        </select>
      </div>

      {/* Section */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Section</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
        >
          <option>Section 1</option>
          <option>Section 2</option>
          <option>Section 3</option>
        </select>
      </div>

      {/* Section */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Checklist Item</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
        >
          <option>Safety & Accessibility</option>
          <option>External Condition</option>
          <option>Leakage Check</option>
          <option>Operation & Function</option>
          <option>Stem, Bonnet & Packing</option>
          <option>Actuator / Operator</option>
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium">Question {index + 1}</p>
              <button
                onClick={() => removeQuestion(q.id)}
                className="text-red-400 text-xs hover:underline"
              >
                Remove
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs mb-1">Question Text</label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                placeholder="Enter question"
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Question Type</label>
              <select
                value={q.type}
                onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2"
              >
                {QUESTION_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={addQuestion}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          + Add Question
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
          Save Question Form
        </button>
      </div>
    </div>
  );
}
