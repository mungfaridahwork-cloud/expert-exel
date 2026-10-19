import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/learningPathData';
import { LearningModule } from '../types';
import { useProgress } from '../context/ProgressContext';
import { Spreadsheet } from '../components/WorksheetStudio/Spreadsheet';

interface LearningPathPageProps {
  onOpenBabyLanguage: (topic?: string) => void;
  onJumpToWorksheetStudio: (presetData?: Record<string, string>, targetCell?: string) => void;
}

export const LearningPathPage: React.FC<LearningPathPageProps> = ({
  onOpenBabyLanguage,
  onJumpToWorksheetStudio
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const { progress, completeLesson } = useProgress();

  const filteredModules = LEARNING_MODULES.filter((m) => {
    if (selectedLevel === 'all') return true;
    return m.level === selectedLevel;
  });

  const handleVerifyModuleExercise = (module: LearningModule, grid: Record<string, any>) => {
    const targetCellKey = module.exercise.targetCell.toUpperCase();
    const cell = grid[targetCellKey];

    if (!cell || cell.raw === undefined || cell.raw === '') {
      return {
        passed: false,
        message: `Kotak ${targetCellKey} masih kosong.`,
        details: `Petunjuk: Masukkan rumus atau nilai ke dalam sel ${targetCellKey} sesuai instruksi latihan.`
      };
    }

    const rawVal = cell.raw.trim();
    const computedVal = cell.computed;

    // Check formula pattern if expected
    if (module.exercise.expectedFormulaPattern) {
      const pattern = typeof module.exercise.expectedFormulaPattern === 'string'
        ? new RegExp(module.exercise.expectedFormulaPattern, 'i')
        : module.exercise.expectedFormulaPattern;

      const formulaMatches = pattern.test(rawVal);
      // Also check if computed value matches
      const valueMatches = String(computedVal).toLowerCase() === String(module.exercise.expectedValue).toLowerCase();

      if (formulaMatches && valueMatches) {
        completeLesson(module.id, module.xpReward, module.title);
        return {
          passed: true,
          message: `Luar biasa! Nilai ${computedVal} dan rumus "${rawVal}" tepat sesuai kaidah Excel! (+${module.xpReward} XP)`,
          details: module.exercise.solutionExplanation
        };
      }

      if (valueMatches && !formulaMatches) {
        return {
          passed: false,
          message: `Nilainya benar (${computedVal}), tetapi apakah kamu mengetik angkanya secara manual (hardcode)?`,
          details: `Petunjuk: Gunakan rumus dinamis yang diawali tanda sama dengan (=), bukan mengetik angka langsung!`
        };
      }

      return {
        passed: false,
        message: `Hasil belum cocok. Nilai saat ini: "${computedVal ?? rawVal}", target yang dicari: "${module.exercise.expectedValue}".`,
        details: `Coba periksa kembali sel yang kamu jadikan referensi atau buka tombol "🧸 Bahasa Bayi" untuk melihat analoginya!`
      };
    }

    // Value only check
    if (String(computedVal).toLowerCase() === String(module.exercise.expectedValue).toLowerCase()) {
      completeLesson(module.id, module.xpReward, module.title);
      return {
        passed: true,
        message: `Tepat sekali! Sel ${targetCellKey} berhasil terisi dengan benar! (+${module.xpReward} XP)`,
        details: module.exercise.solutionExplanation
      };
    }

    return {
      passed: false,
      message: `Hasil belum sesuai. Nilai saat ini: ${computedVal ?? rawVal}, diharapkan: ${module.exercise.expectedValue}.`,
      details: 'Periksa kembali instruksi latihan dan coba kembali.'
    };
  };

  // If a module is opened in detail view
  if (activeModule) {
    const isCompleted = progress.completedLessons.includes(activeModule.id);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
        {/* Back Button */}
        <button
          onClick={() => setActiveModule(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E6D80] hover:text-[#263449] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Jalur Belajar</span>
        </button>

        {/* Module Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8DCE9] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800">
                {activeModule.levelName}
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {activeModule.durationMinutes} Menit
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Award className="w-3.5 h-3.5" />
                +{activeModule.xpReward} XP
              </span>
            </div>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Modul Selesai
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                Sedang Dipelajari
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263449]">
            {activeModule.title}
          </h1>
          <p className="text-sm text-[#5E6D80] leading-relaxed">
            {activeModule.description}
          </p>

          {/* Baby Analogy Callout */}
          <div className="p-4 bg-gradient-to-r from-[#F8DCE9]/80 to-[#DDECFF]/80 rounded-2xl border border-pink-200 flex items-start gap-3">
            <span className="text-2xl select-none shrink-0 mt-0.5">🧸</span>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#263449] uppercase tracking-wider">
                Bahasa Bayi 🧸 (Analogi Sederhana):
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                "{activeModule.babyAnalogy}"
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Objectives & Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600">
              <BookOpen className="w-4 h-4" />
              <span>1. Target Pencapaian</span>
            </div>
            <ul className="text-xs text-[#263449] space-y-2.5 font-medium leading-relaxed">
              {activeModule.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
                <Lightbulb className="w-4 h-4" />
                <span>2. Penjelasan Sederhana</span>
              </div>
              <button
                onClick={() => onOpenBabyLanguage(activeModule.title)}
                className="text-xs font-semibold text-pink-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Tanya Kak Questy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#263449] leading-relaxed">
              {activeModule.simpleExplanation}
            </p>
          </div>
        </div>

        {/* Section 2: Concrete Example Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5E6D80]">
              3. Contoh Kasus & Data Nyata
            </div>
            <div className="text-xs font-mono text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">
              {activeModule.exampleData.formulaDemo}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  {activeModule.exampleData.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {activeModule.exampleData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 font-sans tabular-nums">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Interactive Practice in Spreadsheet Studio */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#263449] flex items-center gap-2">
                <span>4. Latihan Praktik Langsung</span>
                <span className="text-xs font-normal text-slate-500">(Ketik rumus langsung di bawah)</span>
              </h2>
            </div>
            <button
              onClick={() => onJumpToWorksheetStudio(activeModule.exercise.initialData, activeModule.exercise.targetCell)}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Buka di Layar Penuh Worksheet Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Embedded Spreadsheet with verification */}
          <Spreadsheet
            initialData={activeModule.exercise.initialData}
            initialRows={7}
            initialCols={6}
            exercisePrompt={activeModule.exercise.instruction}
            checkLabel="Periksa Jawaban Latihan"
            onVerify={(grid) => handleVerifyModuleExercise(activeModule, grid)}
            onOpenBabyLanguage={() => onOpenBabyLanguage(activeModule.title)}
          />

          {/* Hints & Solution Explanation */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Petunjuk Langkah Pengerjaan:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              {activeModule.exercise.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: Completion Criteria & Next Action */}
        <div className="bg-gradient-to-r from-white via-pink-50/30 to-sky-50/30 rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold text-pink-700 uppercase tracking-wider">
              5. Kriteria Penyelesaian Modul
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
              {activeModule.completionCriteria.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                completeLesson(activeModule.id, activeModule.xpReward, activeModule.title);
              }}
              className="px-6 py-3 bg-[#263449] hover:bg-[#1a2534] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tandai Selesai & Klaim XP</span>
            </button>
            <button
              onClick={() => {
                const currentIndex = LEARNING_MODULES.findIndex((m) => m.id === activeModule.id);
                if (currentIndex < LEARNING_MODULES.length - 1) {
                  setActiveModule(LEARNING_MODULES[currentIndex + 1]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setActiveModule(null);
                }
              }}
              className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Modul Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List of all modules overview view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F8DCE9] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold mb-2">
            <span>📚 Kurikulum Resmi ExcelQuest</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263449]">
            Learning Path
          </h1>
          <p className="text-sm text-[#5E6D80] mt-1 max-w-2xl">
            Tiga tingkatan belajar terstruktur dengan 18 modul interaktif. Setiap modul dilengkapi penjelasan bahasa bayi, latihan spreadsheet nyata, dan pembahasan tuntas.
          </p>
        </div>

        {/* Level filter tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              selectedLevel === 'all'
                ? 'bg-white text-[#263449] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua (18)
          </button>
          <button
            onClick={() => setSelectedLevel(1)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              selectedLevel === 1
                ? 'bg-[#F8DCE9] text-pink-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Level 1: Starter
          </button>
          <button
            onClick={() => setSelectedLevel(2)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              selectedLevel === 2
                ? 'bg-[#DDECFF] text-sky-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Level 2: Explorer
          </button>
          <button
            onClick={() => setSelectedLevel(3)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              selectedLevel === 3
                ? 'bg-purple-100 text-purple-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Level 3: Data Hero
          </button>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const isDone = progress.completedLessons.includes(module.id);
          const levelColor =
            module.level === 1
              ? 'border-[#F8DCE9] hover:border-pink-300'
              : module.level === 2
              ? 'border-[#DDECFF] hover:border-sky-300'
              : 'border-purple-200 hover:border-purple-300';

          return (
            <div
              key={module.id}
              onClick={() => setActiveModule(module)}
              className={`bg-white rounded-3xl p-6 border ${levelColor} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {module.levelName.split('—')[1]?.trim() || module.levelName}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Selesai
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      +{module.xpReward} XP
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-[#263449] text-base group-hover:text-pink-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-xs text-[#5E6D80] leading-relaxed line-clamp-2">
                  {module.description}
                </p>

                {/* Baby Analogy Snippet */}
                <div className="p-3 bg-[#FFFAFD] rounded-xl border border-pink-100 text-[11px] text-slate-600 line-clamp-2">
                  🧸 <em>"{module.babyAnalogy}"</em>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {module.durationMinutes} Menit
                </span>
                <span className="font-bold text-[#263449] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Buka Modul</span>
                  <ChevronRight className="w-4 h-4 text-pink-500" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
