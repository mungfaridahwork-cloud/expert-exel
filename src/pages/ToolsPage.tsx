import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  FileSpreadsheet,
  HelpCircle,
  BookOpen,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Download,
  AlertTriangle,
  Play
} from 'lucide-react';
import { TEMPLATES_DATA, FLASHCARDS_DATA, ERROR_GUIDES, GLOSSARY_TERMS } from '../data/toolsData';
import { Spreadsheet } from '../components/WorksheetStudio/Spreadsheet';
import { useProgress } from '../context/ProgressContext';

interface ToolsPageProps {
  onOpenBabyLanguage: (topic?: string) => void;
  onJumpToWorksheetStudio: (presetData?: Record<string, string>, targetCell?: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  onOpenBabyLanguage,
  onJumpToWorksheetStudio
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'templates' | 'flashcards' | 'errors' | 'glossary' | 'generator'>('templates');

  // Flashcards state
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const { progress, toggleMasteredFlashcard } = useProgress();

  // Glossary search
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  // Error decoder selected error
  const [selectedErrorCode, setSelectedErrorCode] = useState<string>('#DIV/0!');
  const activeError = ERROR_GUIDES.find((e) => e.errorCode === selectedErrorCode) || ERROR_GUIDES[0];

  // Practice generator state
  const [genTopic, setGenTopic] = useState<string>('SUM');
  const [genDifficulty, setGenDifficulty] = useState<string>('Pemula');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const handleGeneratePractice = () => {
    let prompt = '';
    if (genTopic === 'SUM') {
      prompt = `Hitung total pengeluaran belanja di sel B5 menggunakan rumus =SUM(B2:B4).`;
    } else if (genTopic === 'IF') {
      prompt = `Di sel C2, tentukan bonus karyawan: jika nilai penjualan di B2 >= 5000000 berikan bonus 500000, jika tidak 0. Rumus: =IF(B2>=5000000, 500000, 0).`;
    } else if (genTopic === 'VLOOKUP') {
      prompt = `Cari nama produk untuk kode barang di sel E2 dari tabel referensi A2:B5 menggunakan: =VLOOKUP(E2, A2:B5, 2, FALSE).`;
    } else {
      prompt = `Hitung rata-rata nilai siswa di sel B6 menggunakan rumus =AVERAGE(B2:B5).`;
    }
    setGeneratedPrompt(prompt);
  };

  const filteredGlossary = GLOSSARY_TERMS.filter((g) =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#F8DCE9] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold mb-2">
          <span>🛠️ Toolkit & Referensi Cepat</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263449]">
          Tools Tambahan
        </h1>
        <p className="text-sm text-[#5E6D80] mt-1">
          Koleksi template siap pakai, flashcards pengingat rumus, panduan pembasmi error, kamus istilah, dan generator latihan mandiri.
        </p>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
          {[
            { id: 'templates', label: 'Template Corner', icon: '📂' },
            { id: 'flashcards', label: 'Formula Flashcards', icon: '🎴' },
            { id: 'errors', label: 'Error Decoder', icon: '🚨' },
            { id: 'glossary', label: 'Kamus Excel (Glossary)', icon: '📖' },
            { id: 'generator', label: 'Practice Generator', icon: '⚡' }
          ].map((tab) => {
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#263449] text-white border-[#263449] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. TEMPLATE CORNER */}
      {activeSubTab === 'templates' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-xs text-[#5E6D80]">
            Pilih template untuk langsung dibuka di <strong>Worksheet Studio</strong> atau diunduh:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEMPLATES_DATA.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
                      {tmpl.category}
                    </span>
                    <span className="text-xs text-slate-400">Template Siap Pakai</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#263449]">{tmpl.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tmpl.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Formula otomatis terpasang</span>
                  <button
                    onClick={() => onJumpToWorksheetStudio(tmpl.sheetData)}
                    className="px-4 py-2 bg-[#263449] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Buka di Worksheet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. FORMULA FLASHCARDS */}
      {activeSubTab === 'flashcards' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-[#5E6D80]">
            <span>Klik kartu untuk membalik dan melihat jawaban serta analogi baby hint!</span>
            <span className="font-semibold text-emerald-600">
              Dikuasai: {progress.masteredFlashcards.length} dari {FLASHCARDS_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {FLASHCARDS_DATA.map((card) => {
              const isFlipped = flippedCardId === card.id;
              const isMastered = progress.masteredFlashcards.includes(card.id);

              return (
                <div
                  key={card.id}
                  onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                  className={`min-h-[220px] rounded-3xl p-6 border shadow-xs transition-all cursor-pointer flex flex-col justify-between relative group select-none ${
                    isFlipped
                      ? 'bg-gradient-to-br from-[#F8DCE9] to-pink-50 border-pink-300'
                      : isMastered
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-pink-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {card.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMasteredFlashcard(card.id);
                      }}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                        isMastered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {isMastered ? '✓ Dikuasai' : 'Belum'}
                    </button>
                  </div>

                  <div className="my-auto py-2 text-center">
                    {isFlipped ? (
                      <div className="space-y-2">
                        <div className="text-xs text-pink-700 font-bold uppercase tracking-wider">Kunci Rumus:</div>
                        <div className="font-mono text-base font-extrabold text-[#263449] bg-white/80 py-2 px-3 rounded-xl border border-pink-200 inline-block">
                          {card.back}
                        </div>
                        <div className="text-[11px] text-slate-600 italic mt-2">
                          💡 <em>"{card.babyHint}"</em>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kasus / Pertanyaan:</div>
                        <div className="text-sm font-bold text-[#263449] leading-relaxed">
                          {card.front}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-center text-slate-400">
                    {isFlipped ? 'Klik lagi untuk membalik ke pertanyaan' : 'Klik kartu untuk melihat jawaban'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. ERROR DECODER */}
      {activeSubTab === 'errors' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Error code tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ERROR_GUIDES.map((err) => {
              const isSelected = selectedErrorCode === err.errorCode;
              return (
                <button
                  key={err.errorCode}
                  onClick={() => setSelectedErrorCode(err.errorCode)}
                  className={`px-4 py-2 rounded-2xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {err.errorCode}
                </button>
              );
            })}
          </div>

          {/* Active Error Guide Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Panduan Trouble-Shooter Excel
                </span>
                <h2 className="text-2xl font-extrabold text-[#263449] font-mono mt-0.5">
                  {activeError.errorCode} — {activeError.meaning}
                </h2>
              </div>
              <button
                onClick={() => onOpenBabyLanguage(activeError.errorCode)}
                className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold rounded-xl border border-pink-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>🧸 Bahasa Bayi untuk {activeError.errorCode}</span>
              </button>
            </div>

            {/* Baby Analogy */}
            <div className="p-4 bg-gradient-to-r from-rose-50/60 to-pink-50/60 rounded-2xl border border-rose-200 flex items-start gap-3">
              <span className="text-2xl select-none">🚨</span>
              <div className="space-y-1">
                <div className="text-xs font-bold text-rose-900 uppercase">Analogi Bahasa Bayi:</div>
                <p className="text-xs text-rose-950 leading-relaxed font-medium">
                  "{activeError.babyAnalogy}"
                </p>
              </div>
            </div>

            {/* Causes & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Penyebab Utama Terjadinya:</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  {activeError.causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2.5">
                <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Solusi Cara Memperbaikinya:</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  {activeError.solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Fix Exercise if available */}
            {activeError.fixExercise && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-pink-600" />
                  <span>Simulasi Latihan Perbaikan Error:</span>
                </div>
                <Spreadsheet
                  initialData={activeError.fixExercise.initialData}
                  initialRows={4}
                  initialCols={4}
                  exercisePrompt={activeError.fixExercise.instruction}
                  checkLabel="Cek Hasil Perbaikan"
                  onVerify={(grid) => {
                    const targetCell = activeError.fixExercise!.brokenCell;
                    const cell = grid[targetCell];
                    if (!cell) return { passed: false, message: 'Sel belum diisi.' };
                    const valueMatch = String(cell.computed) === String(activeError.fixExercise!.targetValue);
                    if (valueMatch) {
                      return {
                        passed: true,
                        message: `Hebat! Error ${activeError.errorCode} berhasil dijinakkan menjadi ${cell.computed}!`
                      };
                    }
                    return {
                      passed: false,
                      message: `Nilai saat ini: ${cell.computed}, diharapkan: ${activeError.fixExercise!.targetValue}.`
                    };
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. GLOSSARY */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="max-w-md">
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Cari istilah: 'Cell', 'PivotTable', 'VLOOKUP'..."
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-pink-300 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredGlossary.map((g, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 hover:border-pink-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#263449]">{g.term}</h4>
                  <button
                    onClick={() => onOpenBabyLanguage(g.term)}
                    className="text-[10px] text-pink-600 font-semibold hover:underline"
                  >
                    🧸 Bahasa Bayi
                  </button>
                </div>
                <p className="text-xs text-[#5E6D80] leading-relaxed">{g.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PRACTICE GENERATOR */}
      {activeSubTab === 'generator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200 max-w-2xl">
          <div className="space-y-1">
            <h3 className="font-extrabold text-xl text-[#263449]">
              Generator Latihan Kustom
            </h3>
            <p className="text-xs text-[#5E6D80]">
              Pilih topik dan tingkat kesulitan untuk membuat tantangan baru secara instan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pilih Topik Rumus:</label>
              <select
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-300"
              >
                <option value="SUM">Penjumlahan (SUM)</option>
                <option value="AVERAGE">Rata-rata (AVERAGE)</option>
                <option value="IF">Logika Bersyarat (IF)</option>
                <option value="VLOOKUP">Pencarian Data (VLOOKUP)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tingkat Kesulitan:</label>
              <select
                value={genDifficulty}
                onChange={(e) => setGenDifficulty(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-300"
              >
                <option value="Pemula">Pemula (Dasar 1 Langkah)</option>
                <option value="Menengah">Menengah (Studi Kasus Toko)</option>
                <option value="Mahir">Mahir (Kombinasi Rumus)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGeneratePractice}
            className="w-full py-3 bg-[#263449] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>Generate Soal Tantangan</span>
          </button>

          {generatedPrompt && (
            <div className="p-5 bg-gradient-to-r from-pink-50/50 to-sky-50/50 rounded-2xl border border-pink-200 space-y-3 animate-in fade-in duration-200">
              <div className="text-xs font-bold text-pink-700 uppercase">Soal Tantanganmu:</div>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                {generatedPrompt}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onJumpToWorksheetStudio()}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
                  <span>Buka Worksheet Studio untuk Mencoba</span>
                </button>
                <button
                  onClick={() => onOpenBabyLanguage(genTopic)}
                  className="text-xs text-pink-700 font-semibold hover:underline"
                >
                  🧸 Tanya Bahasa Bayi
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
