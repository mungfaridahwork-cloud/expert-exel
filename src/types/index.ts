export type ActiveTab = 
  | 'home' 
  | 'learning-path' 
  | 'worksheet-studio' 
  | 'daily-quest' 
  | 'project-lab' 
  | 'formula-finder' 
  | 'tools' 
  | 'my-progress';

export interface CellData {
  raw: string; // formula like "=SUM(A1:A3)" or raw text/number "100"
  computed: string | number | null;
  error?: string | null;
  format?: 'text' | 'number' | 'currency' | 'percent';
  bold?: boolean;
  align?: 'left' | 'center' | 'right';
  bg?: string;
  textColor?: string;
}

export type GridData = Record<string, CellData>; // key like "A1", "B2"

export interface LearningModule {
  id: string;
  level: 1 | 2 | 3;
  levelName: string;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  objectives: string[];
  simpleExplanation: string;
  babyAnalogy: string;
  exampleData: {
    headers: string[];
    rows: (string | number)[][];
    formulaDemo: string;
    resultDemo: string;
  };
  exercise: {
    instruction: string;
    targetCell: string;
    expectedFormulaPattern: RegExp | string;
    expectedValue: string | number;
    initialData: Record<string, string>; // cellId -> raw value
    hints: string[];
    solutionExplanation: string;
  };
  completionCriteria: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Pemula' | 'Menengah' | 'Mahir';
  estimatedTime: string;
  xpReward: number;
  scenario: string;
  initialSheetData: Record<string, string>;
  tasks: {
    id: string;
    instruction: string;
    targetCell: string;
    checkType: 'formula' | 'value' | 'both';
    expectedFormulaPattern?: string;
    expectedValue?: string | number;
    explanation: string;
  }[];
  rubric: {
    criteria: string;
    points: number;
  }[];
  solutionGuide: {
    step: string;
    cell: string;
    formula: string;
    reason: string;
  }[];
}

export interface FormulaFinderEntry {
  id: string;
  name: string;
  category: 'Hitung & Statistik' | 'Logika & Syarat' | 'Lookup & Referensi' | 'Teks' | 'Tanggal & Waktu';
  userNeedIndonesian: string; // e.g. "Menjumlahkan data jika memenuhi kriteria tertentu"
  simpleUtility: string;
  syntax: string;
  parameters: {
    name: string;
    desc: string;
    optional?: boolean;
  }[];
  example: string;
  exampleExplanation: string;
  commonMistakes: string[];
  worksheetPreset?: {
    data: Record<string, string>;
    targetCell: string;
    presetFormula: string;
  };
}

export interface DailyQuestItem {
  id: string;
  type: 'quiz' | 'formula_drill';
  title: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  xp: number;
  prompt: string;
  questionContext?: string;
  options?: string[]; // for quiz
  correctOptionIndex?: number; // for quiz
  targetFormula?: string; // for formula_drill
  expectedValue?: string | number;
  explanation: string;
  commonTrap: string;
  similarPromptId?: string;
  initialSheetData?: Record<string, string>;
  targetCell?: string;
}

export interface Flashcard {
  id: string;
  category: string;
  front: string; // Pertanyaan / Kasus
  back: string; // Rumus & Penjelasan
  babyHint: string;
}

export interface ExcelErrorGuide {
  errorCode: string;
  meaning: string;
  babyAnalogy: string;
  causes: string[];
  solutions: string[];
  exampleBad: string;
  exampleGood: string;
  fixExercise?: {
    initialData: Record<string, string>;
    brokenCell: string;
    instruction: string;
    targetValue: string | number;
  };
}

export interface ExcelTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  sheetData: Record<string, string>;
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[]; // module ids
  completedQuests: string[]; // quest ids
  completedProjects: string[]; // project ids
  masteredFlashcards: string[];
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
  history: {
    id: string;
    date: string;
    action: string;
    xpGained: number;
  }[];
}
