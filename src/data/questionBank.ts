import type { QuestionType } from "./questionTypes";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
}

export interface QuestionFormConfig {
  valveType: string;
  section: string;
  questions: Question[];
}

export const questionBank: QuestionFormConfig[] = [];
