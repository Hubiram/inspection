export type QuestionType =
  | "yesno"
  | "select"
  | "text"
  | "textarea";

export interface InspectionQuestion {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[];
}

export const inspectionQuestions: Record<
  string,
  InspectionQuestion[]
> = {
  "Safety & Accessibility": [
    {
      id: "valve_damaged",
      label: "Is valve damaged?",
      type: "yesno",
    },
    {
      id: "replacement_required",
      label: "Should valve be replaced?",
      type: "yesno",
    },
    {
      id: "operational_status",
      label: "Operational Status of Valve",
      type: "select",
      options: ["Operational", "Partially Operational", "Non-Operational"],
    },
    {
      id: "summary",
      label: "Summary of status of valve",
      type: "textarea",
    },
  ],

  "External Condition": [
    {
      id: "corrosion",
      label: "Is corrosion present?",
      type: "yesno",
    },
    {
      id: "leakage_visible",
      label: "Is leakage visible?",
      type: "yesno",
    },
    {
      id: "remarks",
      label: "Remarks",
      type: "textarea",
    },
  ],

  "Operation & Function": [
    {
      id: "smooth_operation",
      label: "Does the valve operate smoothly?",
      type: "yesno",
    },
    {
      id: "abnormal_noise",
      label: "Any abnormal noise?",
      type: "yesno",
    },
    {
      id: "comments",
      label: "Comments",
      type: "textarea",
    },
  ],
};
