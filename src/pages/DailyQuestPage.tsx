import React, { useState } from 'react';
import {
  Flame,
  Award,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';
import { DAILY_QUESTS } from '../data/dailyQuestsData';
import { DailyQuestItem } from '../types';
import { useProgress } from '../context/ProgressContext';
import { Spreadsheet } from '../components/WorksheetStudio/Spreadsheet';

interface DailyQuestPageProps {
  onOpenBabyLanguage: (topic?: string) => void;
}

export const DailyQuestPage: React.FC<DailyQuestPageProps> = ({ onOpenBabyLanguage }) => {
  const [activeQuestIndex, setActiveQuestIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const { progress, completeQuest } = useProgress();

  const currentQuest: DailyQuestItem = DAILY_QUESTS[activeQuestIndex] || DAILY_QUESTS[0];
  const isDone = progress.completedQuests.includes(currentQuest.id);

  const handleOptionSelect = (index: number) => {
    if (hasSubmitted && isDone) return;
    setSelectedOption(index);
    setHasSubmitted(false);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setHasSubmitted(true);
    if (selectedOption === currentQuest.correctOptionIndex) {
      completeQuest(currentQuest.id, currentQuest.xp, currentQuest.title);
    }
  };

  const handleVerifyFormulaDrill = (grid: Record<string, any>) => {
    const targetCellKey = (currentQuest.targetCell || 'C2').toUpperCase();
    const cell = grid[targetCellKey];

    if (!cell || !cell.raw) {
      return {
        passed: false,
        message: `Kotak ${targetCellKey} masih kosong.`,
        details: 'Ketik rumus matematika diawali tanda = ke dalam sel target.'
      };
    }

    const raw = cell.raw.trim();
    const computed = cell.computed;

    const valueMatches = String(computed).toLowerCase() === String(currentQuest.expectedValue).toLowerCase();

    if (valueMatches) {
      completeQuest(currentQuest.id, currentQuest.xp, currentQuest.title);
      return {
        passed: true,
        message: `Tepat sekali! Formula "${raw}" menghasilkan ${computed}! (+${currentQuest.xp} XP)`,
        details: currentQuest.explanation
      };
    }

    return {
      passed: false,
      message: `Hasil belum cocok. Nilai saat ini: ${computed ?? raw}, target yang dicari: ${currentQuest.expectedValue}.`,
      details: currentQuest.commonTrap
    };
  };

  const handleTrySimilar = () => {
    if (currentQuest.similarPromptId) {
      const simIdx = DAILY_QUESTS.findIndex((q) => q.id === currentQuest.similarPromptId);
      if (simIdx !== -1) {
        setActiveQuestIndex(simIdx);
        setSelectedOption(null);
        setHasSubmitted(false);
        return;
      }
    }
    // Else next quest
    const nextIdx = (activeQuestIndex + 1) % DAILY_QUESTS.length;
    setActiveQuestIndex(nextIdx);
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Streak & XP */}
      <div className="bg-gradient-to-r from-[#F8DCE9] via-white to-[#DDECFF] rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Streak Belajar: {progress.streakDays} Hari Aktif!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263449]">
            Daily Quest
          </h1>
          <p className="text-xs text-[#5E6D80]">
            Selesaikan misi harian untuk mengasah refleks formula dan mengumpulkan XP!
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-pink-100 shadow-xs">
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">Total Quest Selesai</div>
            <div className="text-xl font-extrabold text-[#263449]">{progress.completedQuests.length} Misi</div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">Total XP</div>
            <div className="text-xl font-extrabold text-pink-600">+{progress.xp}</div>
          </div>
        </div>
      </div>

      {/* Quest Navigator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DAILY_QUESTS.map((q, idx) => {
          const isQDone = progress.completedQuests.includes(q.id);
          const isSelected = activeQuestIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuestIndex(idx);
                setSelectedOption(null);
                setHasSubmitted(false);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-[#263449] text-white border-[#263449] shadow-sm'
                  : isQDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isQDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                )}
                <span>Misi #{idx + 1}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Quest Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Quest Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Tingkat: {currentQuest.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              +{currentQuest.xp} XP
            </span>
          </div>

          <button
            onClick={handleTrySimilar}
            className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Coba Soal Serupa</span>
          </button>
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#263449]">
            {currentQuest.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            {currentQuest.prompt}
          </p>
          {currentQuest.questionContext && (
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
              💡 {currentQuest.questionContext}
            </div>
          )}
        </div>

        {/* Mode A: Quiz Multiple Choice */}
        {currentQuest.type === 'quiz' && currentQuest.options && (
          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5E6D80]">
              Pilih satu jawaban yang paling tepat:
            </div>
            <div className="space-y-2.5">
              {currentQuest.options.map((opt, oIdx) => {
                const isChosen = selectedOption === oIdx;
                const isCorrect = oIdx === currentQuest.correctOptionIndex;

                let stateClasses = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';
                if (hasSubmitted) {
                  if (isCorrect) {
                    stateClasses = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                  } else if (isChosen && !isCorrect) {
                    stateClasses = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                  }
                } else if (isChosen) {
                  stateClasses = 'bg-[#F8DCE9] border-pink-300 text-[#263449] font-bold shadow-xs';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionSelect(oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${stateClasses}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {hasSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit Quiz Action */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleQuizSubmit}
                disabled={selectedOption === null || (hasSubmitted && selectedOption === currentQuest.correctOptionIndex)}
                className="px-6 py-3 bg-[#263449] hover:bg-[#1a2534] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Periksa Jawaban Kuis</span>
                <CheckCircle2 className="w-4 h-4 text-pink-300" />
              </button>

              <button
                onClick={() => onOpenBabyLanguage(currentQuest.prompt)}
                className="text-xs font-semibold text-pink-700 hover:underline"
              >
                🧸 Tanya Bahasa Bayi
              </button>
            </div>
          </div>
        )}

        {/* Mode B: Interactive Formula Drill Spreadsheet */}
        {currentQuest.type === 'formula_drill' && currentQuest.initialSheetData && (
          <div className="space-y-4 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5E6D80]">
              Spreadsheet Latihan Interaktif:
            </div>
            <Spreadsheet
              initialData={currentQuest.initialSheetData}
              initialRows={6}
              initialCols={5}
              exercisePrompt={currentQuest.prompt}
              checkLabel="Cek Rumus Kamu"
              onVerify={handleVerifyFormulaDrill}
              onOpenBabyLanguage={() => onOpenBabyLanguage(currentQuest.title)}
            />
          </div>
        )}

        {/* Detailed Feedback & Common Trap Note */}
        {hasSubmitted && currentQuest.type === 'quiz' && (
          <div
            className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-in fade-in duration-200 ${
              selectedOption === currentQuest.correctOptionIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="font-bold flex items-center gap-2 text-base">
              {selectedOption === currentQuest.correctOptionIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Jawaban Tepat! (+{currentQuest.xp} XP) 🎉</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-5 h-5 text-rose-600" />
                  <span>Kurang Tepat, Jangan Khawatir! 💡</span>
                </>
              )}
            </div>
            <p>{currentQuest.explanation}</p>
            {currentQuest.commonTrap && (
              <div className="p-3 bg-white/80 rounded-xl border border-current/20 text-xs">
                <strong>⚠️ Jebakan yang sering terjadi:</strong> {currentQuest.commonTrap}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
