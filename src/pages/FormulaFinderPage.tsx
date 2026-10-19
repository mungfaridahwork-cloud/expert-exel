import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Layers
} from 'lucide-react';
import { FORMULA_FINDER_DATA } from '../data/formulaFinderData';
import { FormulaFinderEntry } from '../types';

interface FormulaFinderPageProps {
  onOpenBabyLanguage: (topic?: string) => void;
  onJumpToWorksheetStudio: (presetData?: Record<string, string>, targetCell?: string) => void;
}

export const FormulaFinderPage: React.FC<FormulaFinderPageProps> = ({
  onOpenBabyLanguage,
  onJumpToWorksheetStudio
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Hitung & Statistik',
    'Logika & Syarat',
    'Lookup & Referensi',
    'Teks',
    'Tanggal & Waktu'
  ];

  const filteredEntries = FORMULA_FINDER_DATA.filter((entry) => {
    const matchesCategory = selectedCategory === 'Semua' || entry.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesName = entry.name.toLowerCase().includes(q);
    const matchesNeed = entry.userNeedIndonesian.toLowerCase().includes(q);
    const matchesUtil = entry.simpleUtility.toLowerCase().includes(q);
    const matchesSyntax = entry.syntax.toLowerCase().includes(q);

    return matchesCategory && (matchesName || matchesNeed || matchesUtil || matchesSyntax);
  });

  const handleTryInWorksheet = (entry: FormulaFinderEntry) => {
    if (entry.worksheetPreset) {
      onJumpToWorksheetStudio(entry.worksheetPreset.data, entry.worksheetPreset.targetCell);
    } else {
      onJumpToWorksheetStudio();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Intent Search Bar */}
      <div className="bg-gradient-to-r from-[#F8DCE9] via-white to-[#DDECFF] rounded-3xl p-6 sm:p-10 border border-pink-200 shadow-xs space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-bold shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>Pencarian Berbasis Kebutuhan Nyata</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263449]">
            Formula Finder
          </h1>
          <p className="text-xs sm:text-sm text-[#5E6D80] leading-relaxed">
            Tidak ingat nama rumusnya? Cukup ketik apa yang ingin kamu lakukan (contoh: <em>"menjumlahkan kalau cabang Jakarta"</em>, <em>"cari data ke kiri"</em>, <em>"potong kode faktur"</em>).
          </p>
        </div>

        {/* Big Search Input */}
        <div className="relative max-w-3xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kebutuhan: 'menghitung rata-rata', 'gabung nama', 'cari harga barang', 'cegah error'..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-pink-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#263449] text-white border-[#263449] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#5E6D80] px-2">
        <span>Menampilkan <strong>{filteredEntries.length}</strong> rumus yang sesuai</span>
        <span className="text-slate-400">Klik "Coba di Worksheet" untuk menguji langsung</span>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F8DCE9] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                    {entry.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#263449] mt-1 font-mono">
                    ={entry.name}
                  </h3>
                </div>
                <button
                  onClick={() => onOpenBabyLanguage(entry.name)}
                  className="px-2.5 py-1 text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Jelaskan dalam bahasa bayi"
                >
                  <span>🧸 Bahasa Bayi</span>
                </button>
              </div>

              {/* User Intent / Need */}
              <div className="p-3 bg-[#FFFAFD] rounded-xl border border-pink-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-0.5">
                  Kebutuhan yang diselesaikan:
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  "{entry.userNeedIndonesian}"
                </div>
              </div>

              {/* Plain Utility */}
              <p className="text-xs text-[#5E6D80] leading-relaxed">
                {entry.simpleUtility}
              </p>

              {/* Syntax & Example Box */}
              <div className="space-y-2">
                <div className="p-3 bg-slate-900 rounded-xl text-white font-mono text-xs overflow-x-auto">
                  <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">Sintaks Resmi:</div>
                  <div className="text-sky-300 font-semibold">{entry.syntax}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Contoh Nyata:</div>
                  <div className="font-mono text-pink-700 font-semibold">{entry.example}</div>
                  <div className="text-slate-600 text-[11px] leading-relaxed">{entry.exampleExplanation}</div>
                </div>
              </div>

              {/* Common Pitfalls / Kesalahan Umum */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                  <span>Kesalahan Umum Pemula:</span>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  {entry.commonMistakes.map((mistake, mIdx) => (
                    <li key={mIdx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onOpenBabyLanguage(entry.name)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                Minta contoh lain
              </button>

              <button
                onClick={() => handleTryInWorksheet(entry)}
                className="px-4 py-2 bg-[#263449] hover:bg-[#1a2534] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Coba di Worksheet</span>
                <ArrowRight className="w-3.5 h-3.5 text-pink-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
