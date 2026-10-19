import React from 'react';
import {
  Award,
  Flame,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  FolderGit2,
  ShieldCheck,
  TrendingUp,
  Download,
  Info
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LEARNING_MODULES } from '../data/learningPathData';
import { PROJECTS_DATA } from '../data/projectsData';

export const MyProgressPage: React.FC = () => {
  const {
    progress,
    levelTitle,
    levelRank,
    nextLevelXP,
    progressPercent,
    resetProgress
  } = useProgress();

  const totalLessonsCount = LEARNING_MODULES.length;
  const completedLessonsCount = progress.completedLessons.length;
  const totalProjectsCount = PROJECTS_DATA.length;
  const completedProjectsCount = progress.completedProjects.length;

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'ExcelQuest_Progress_Backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="border-b border-[#F8DCE9] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold mb-2">
          <span>👑 Dasbor & Pencapaian Belajar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263449]">
          My Progress
        </h1>
        <p className="text-sm text-[#5E6D80] mt-1">
          Pantau progres belajarmu, lencana yang berhasil dikoleksi, serta riwayat latihan harian.
        </p>
      </div>

      {/* Persistence Transparency Notice */}
      <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 flex items-start gap-3 text-xs text-sky-950">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold mb-0.5">Catatan Penyimpanan Progres:</strong>
          Progres belajarmu disimpan secara persisten di penyimpanan browser lokalmu (Local Storage). Kamu bisa belajar kapan saja tanpa perlu login, dan mengekspor cadangan datamu lewat tombol di bawah.
        </div>
      </div>

      {/* Main KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Level & Rank */}
        <div className="bg-white rounded-3xl p-6 border border-[#F8DCE9] shadow-xs space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-pink-600">Level Kamu</div>
          <div className="text-xl font-extrabold text-[#263449]">{levelTitle}</div>
          <div className="text-xs text-slate-500 font-medium">Rank {levelRank} dari 5 Tingkatan</div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-gradient-to-r from-pink-400 to-sky-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 text-right">
            {progress.xp} / {nextLevelXP} XP ({progressPercent}%)
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Daily Streak</span>
          </div>
          <div className="text-3xl font-extrabold text-[#263449]">
            {progress.streakDays} <span className="text-sm font-semibold text-slate-500">Hari</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Terus pertahankan konsistensi belajar Excel tiap hari!
          </p>
        </div>

        {/* Completed Lessons */}
        <div className="bg-white rounded-3xl p-6 border border-[#DDECFF] shadow-xs space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modul Pembelajaran</span>
          </div>
          <div className="text-3xl font-extrabold text-[#263449]">
            {completedLessonsCount} <span className="text-sm font-semibold text-slate-400">/ {totalLessonsCount}</span>
          </div>
          <p className="text-xs text-slate-500">
            {Math.round((completedLessonsCount / totalLessonsCount) * 100)}% dari seluruh silabus tuntas
          </p>
        </div>

        {/* Completed Projects */}
        <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-xs space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Studi Kasus Proyek</span>
          </div>
          <div className="text-3xl font-extrabold text-[#263449]">
            {completedProjectsCount} <span className="text-sm font-semibold text-slate-400">/ {totalProjectsCount}</span>
          </div>
          <p className="text-xs text-slate-500">
            {completedProjectsCount > 0 ? 'Portofolio latihan aktif' : 'Belum ada proyek yang selesai'}
          </p>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#263449] flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Koleksi Lencana Pencapaian (Badges)</span>
            </h2>
            <p className="text-xs text-slate-500">Dapatkan badge khusus saat menuntaskan tantangan tertentu.</p>
          </div>
          <span className="text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
            {progress.badges.length} Terkumpul
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
          {[
            { id: 'first_step', name: 'Langkah Pertama', icon: '🌱', desc: 'Menyelesaikan modul pertama' },
            { id: 'sum_master', name: 'Master SUM', icon: '➕', desc: 'Penjumlahan otomatis' },
            { id: 'logic_guru', name: 'Logika Cerdas', icon: '⚡', desc: 'Kuasai fungsi IF' },
            { id: 'quest_hunter', name: 'Pemburu Quest', icon: '🎯', desc: 'Tuntaskan Daily Quest' },
            { id: 'project_builder', name: 'Arsitek Proyek', icon: '💼', desc: 'Tuntaskan Project Lab' },
            { id: 'data_hero', name: 'Excel Hero', icon: '👑', desc: 'Mencapai 1000+ XP' }
          ].map((b) => {
            const isUnlocked = progress.badges.some((ub) => ub.id === b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-pink-50/50 to-white border-pink-200 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200 opacity-40 grayscale'
                }`}
              >
                <div className="text-3xl select-none">{b.icon}</div>
                <div className="font-bold text-xs text-[#263449]">{b.name}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{b.desc}</div>
                <div className="text-[9px] font-bold text-pink-600">
                  {isUnlocked ? '✓ Terbuka' : 'Terkunci'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity History Log & Data Management */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* History */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Riwayat Aktivitas Belajar Terbaru
          </div>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {progress.history.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800">{item.action}</div>
                  <div className="text-[11px] text-slate-400">{item.date}</div>
                </div>
                {item.xpGained > 0 && (
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +{item.xpGained} XP
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Controls */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kelola Data Belajar
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kamu bisa mengunduh file cadangan progres belajarmu atau mereset data jika ingin mengulang pembelajaran dari awal.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={handleExportData}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup Data (.JSON)</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Apakah kamu yakin ingin mereset seluruh progres belajar? XP dan lencana akan kembali ke 0.')) {
                  resetProgress();
                }
              }}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Seluruh Progres</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
