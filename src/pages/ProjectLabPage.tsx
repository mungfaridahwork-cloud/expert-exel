import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Sparkles,
  BookOpen,
  Play
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types';
import { useProgress } from '../context/ProgressContext';
import { Spreadsheet } from '../components/WorksheetStudio/Spreadsheet';

interface ProjectLabPageProps {
  onOpenBabyLanguage: (topic?: string) => void;
  onJumpToWorksheetStudio: (presetData?: Record<string, string>, targetCell?: string) => void;
}

export const ProjectLabPage: React.FC<ProjectLabPageProps> = ({
  onOpenBabyLanguage,
  onJumpToWorksheetStudio
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const { progress, completeProject } = useProgress();

  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || null;

  const handleVerifyProject = (proj: ProjectItem, grid: Record<string, any>) => {
    let passedTasksCount = 0;
    const taskResults: { id: string; passed: boolean; message: string }[] = [];

    for (const task of proj.tasks) {
      const cell = grid[task.targetCell.toUpperCase()];
      if (!cell || cell.raw === undefined || cell.raw === '') {
        taskResults.push({
          id: task.id,
          passed: false,
          message: `Sel ${task.targetCell} masih belum diisi.`
        });
        continue;
      }

      const raw = cell.raw.trim();
      const computed = cell.computed;

      let formulaOk = true;
      let valueOk = true;

      if (task.expectedFormulaPattern) {
        const regex = new RegExp(task.expectedFormulaPattern, 'i');
        formulaOk = regex.test(raw);
      }

      if (task.expectedValue !== undefined) {
        valueOk = String(computed).toLowerCase() === String(task.expectedValue).toLowerCase();
      }

      if (formulaOk && valueOk) {
        passedTasksCount++;
        taskResults.push({
          id: task.id,
          passed: true,
          message: `Sel ${task.targetCell} BENAR: ${raw} = ${computed}`
        });
      } else if (valueOk && !formulaOk) {
        taskResults.push({
          id: task.id,
          passed: false,
          message: `Sel ${task.targetCell} nilainya cocok (${computed}), tetapi harap gunakan rumus otomatis bukan angka manual!`
        });
      } else {
        taskResults.push({
          id: task.id,
          passed: false,
          message: `Sel ${task.targetCell} belum tepat. Nilai: ${computed ?? raw}, target: ${task.expectedValue}.`
        });
      }
    }

    const allPassed = passedTasksCount === proj.tasks.length;
    if (allPassed) {
      completeProject(proj.id, proj.xpReward, proj.title);
      return {
        passed: true,
        message: `Luar biasa! Semua ${proj.tasks.length} tugas dalam studi kasus ini terselesaikan sempurna! (+${proj.xpReward} XP)`,
        details: taskResults.map((t) => t.message).join(' | ')
      };
    }

    return {
      passed: false,
      message: `Progres: ${passedTasksCount} dari ${proj.tasks.length} tugas berhasil.`,
      details: taskResults.map((t) => t.message).join(' \n')
    };
  };

  // Detailed view of single project
  if (activeProject) {
    const isCompleted = progress.completedProjects.includes(activeProject.id);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
        <button
          onClick={() => {
            setSelectedProjectId(null);
            setShowSolution(false);
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E6D80] hover:text-[#263449] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Project Lab</span>
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDECFF] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800">
                {activeProject.category}
              </span>
              <span className="text-slate-300">·</span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                Tingkat: {activeProject.difficulty}
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {activeProject.estimatedTime}
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Award className="w-3.5 h-3.5" />
                +{activeProject.xpReward} XP
              </span>
            </div>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Proyek Selesai!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                Sedang Dikerjakan
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263449]">
            {activeProject.title}
          </h1>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-[#263449] leading-relaxed">
            <strong className="text-slate-900 block mb-1">📋 Skenario Kasus Nyata:</strong>
            {activeProject.scenario}
          </div>
        </div>

        {/* Project Tasks Checklist */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Daftar Target Tugas yang Harus Diselesaikan di Spreadsheet:
          </div>
          <div className="space-y-2">
            {activeProject.tasks.map((task, i) => (
              <div
                key={task.id}
                className="p-3 bg-[#FFFAFD] rounded-xl border border-pink-100 flex items-start gap-3 text-xs"
              >
                <span className="w-5 h-5 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800">{task.instruction}</div>
                  <div className="text-slate-500 text-[11px]">{task.explanation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Interactive Spreadsheet */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#263449]">
              Lembar Kerja Proyek
            </h2>
            <button
              onClick={() => onJumpToWorksheetStudio(activeProject.initialSheetData)}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Buka di Layar Penuh Worksheet Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <Spreadsheet
            initialData={activeProject.initialSheetData}
            initialRows={14}
            initialCols={8}
            checkLabel="Evaluasi Hasil Proyek"
            onVerify={(grid) => handleVerifyProject(activeProject, grid)}
            onOpenBabyLanguage={() => onOpenBabyLanguage(activeProject.title)}
          />
        </div>

        {/* Automated Rubric & Solution Guide Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Rubric */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5E6D80]">
              Rubrik Penilaian Otomatis
            </div>
            <div className="space-y-2">
              {activeProject.rubric.map((r, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-700">{r.criteria}</span>
                  <span className="font-bold text-sky-700 shrink-0 ml-2">{r.points} Poin</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Guide Toggle */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-pink-700">
                Panduan Langkah & Kunci Solusi
              </div>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-3 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {showSolution ? 'Sembunyikan Solusi' : 'Tampilkan Kunci Solusi'}
              </button>
            </div>

            {showSolution ? (
              <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                {activeProject.solutionGuide.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-pink-50/50 border border-pink-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#263449]">{s.step} (Sel {s.cell})</span>
                      <code className="bg-white px-2 py-0.5 rounded border border-pink-200 text-pink-700 font-mono text-[11px]">
                        {s.formula}
                      </code>
                    </div>
                    <p className="text-slate-600 text-[11px]">{s.reason}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed pt-2">
                Cobalah kerjakan sendiri terlebih dahulu di lembar kerja di atas! Jika kamu benar-benar menemui jalan buntu, klik tombol di atas untuk membuka bocoran rumus langkah demi langkah.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Projects Grid List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#F8DCE9] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
          <span>💼 Studi Kasus Dunia Nyata</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263449]">
          Project Lab
        </h1>
        <p className="text-sm text-[#5E6D80] mt-1 max-w-2xl">
          Terapkan rumus Excel pada skenario riil: Anggaran Kos, Penjualan Toko, Stok Otomatis, Absensi Tim, Arus Kasir, dan Dashboard Eksekutif.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((proj) => {
          const isDone = progress.completedProjects.includes(proj.id);

          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className="bg-white rounded-3xl p-6 border border-[#DDECFF] hover:border-sky-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {proj.category}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Selesai
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      +{proj.xpReward} XP
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-[#263449] text-base group-hover:text-sky-700 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#5E6D80] leading-relaxed line-clamp-3">
                  {proj.scenario}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span>{proj.tasks.length} Target Tugas</span>
                  <span>·</span>
                  <span>Tingkat: {proj.difficulty}</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {proj.estimatedTime}
                </span>
                <span className="font-bold text-[#263449] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Mulai Proyek</span>
                  <ChevronRight className="w-4 h-4 text-sky-600" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
