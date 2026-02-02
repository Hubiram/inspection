export type ChecklistCategory = string;

export interface ValveChecklistConfig {
  valveType: string;
  categories: ChecklistCategory[];
}

export const checklistConfig: ValveChecklistConfig[] = [
  {
    valveType: "Gate Valve",
    categories: [
      "Safety & Accessibility",
      "External Condition",
      "Operation & Function",
    ],
  },
  {
    valveType: "Ball Valve",
    categories: [
      "Safety & Accessibility",
      "Leakage Check",
      "Stem, Bonnet & Packing",
      "Actuator / Operator",
    ],
  },
];
