import React, { useState } from 'react';
import {
  FileSpreadsheet,
  FolderOpen,
  Sparkles,
  Download,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Spreadsheet } from '../components/WorksheetStudio/Spreadsheet';
import { TEMPLATES_DATA } from '../data/toolsData';

interface WorksheetStudioPageProps {
  onOpenBabyLanguage: (topic?: string) => void;
  presetData?: Record<string, string>;
  targetCell?: string;
}

export const WorksheetStudioPage: React.FC<WorksheetStudioPageProps> = ({
  onOpenBabyLanguage,
  presetData,
  targetCell
}) => {
  const [currentSheetData, setCurrentSheetData] = useState<Record<string, string>>(() => {
    if (presetData && Object.keys(presetData).length > 0) {
      return presetData;
    }
    // Default pleasant starter dataset
    return {
      A1: 'PRODUK', B1: 'QTY', C1: 'HARGA SATUAN', D1: 'SUBTOTAL',
      A2: 'Donat Cokelat Keju', B2: '5', C2: '9000', D2: '=B2*C2',
      A3: 'Croissant Butter', B3: '3', C3: '16000', D3: '=B3*C3',
      A4: 'Kopi Susu Gula Aren', B4: '4', C4: '18000', D4: '=B4*C4',
      A5: 'Teh Hijau Panas', B5: '2', C5: '12000', D5: '=B5*C5',
      A6: 'GRAND TOTAL OMSET', B6: '', C6: '', D6: '=SUM(D2:D5)',
      A7: 'RATA-RATA HARGA', B7: '', C7: '', D7: '=AVERAGE(C2:C5)'
    };
  });

  const [activeTemplateName, setActiveTemplateName] = useState<string>('Latihan Kasir Bakeri');
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);

  const handleSelectTemplate = (template: typeof TEMPLATES_DATA[0]) => {
    setCurrentSheetData(template.sheetData);
    setActiveTemplateName(template.title);
    setShowTemplateModal(false);
  };

  const handleBlankSheet = () => {
    setCurrentSheetData({});
    setActiveTemplateName('Lembar Kosong (Blank)');
    setShowTemplateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F8DCE9] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-mono font-bold text-sm">
              fx
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263449]">
              Worksheet Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              Formula Engine Aktif
            </span>
          </div>
          <p className="text-xs text-[#5E6D80] mt-1">
            Spreadsheet interaktif penuh. Mendukung operasi matematika, rumus SUM, AVERAGE, IF, SUMIF, COUNTIF, VLOOKUP, XLOOKUP, dan ekspor .XLSX!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-sky-600" />
            <span>Pilih Template: <strong className="text-pink-600">{activeTemplateName}</strong></span>
          </button>

          <button
            onClick={() => onOpenBabyLanguage()}
            className="px-4 py-2 bg-[#F8DCE9] hover:bg-pink-200 text-pink-900 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🧸 Bantuan Bahasa Bayi</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Spreadsheet */}
      <Spreadsheet
        initialData={currentSheetData}
        initialRows={16}
        initialCols={10}
        onOpenBabyLanguage={onOpenBabyLanguage}
      />

      {/* Quick Tips & Supported Formulas Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
          <div className="font-bold text-[#263449] flex items-center gap-1.5">
            <span className="text-pink-600">⌨️</span>
            <span>Navigasi & Pintasan Spreadsheet:</span>
          </div>
          <ul className="space-y-1 text-slate-600">
            <li>• Klik ganda (Double-Click) pada sel untuk mulai mengedit teks/rumus.</li>
            <li>• Gunakan tombol <strong>Panah Keyboard</strong> untuk berpindah kotak.</li>
            <li>• Tekan <strong>Enter</strong> untuk menyimpan hasil dan pindah baris ke bawah.</li>
            <li>• Tekan <strong>Delete / Backspace</strong> untuk mengosongkan sel.</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
          <div className="font-bold text-[#263449] flex items-center gap-1.5">
            <span className="text-sky-600">⚡</span>
            <span>Rumus yang Didukung Penuh:</span>
          </div>
          <p className="text-slate-600 font-mono text-[11px] leading-relaxed">
            =SUM, =AVERAGE, =MIN, =MAX, =COUNT, =COUNTA, =IF, =SUMIF, =COUNTIF, =VLOOKUP, =XLOOKUP, =CONCAT, =LEFT, =RIGHT, =MID, =ROUND, =IFERROR, =TODAY
          </p>
          <div className="text-[11px] text-slate-400">
            Semua formula dihitung lokal di browser tanpa evaluasi kode berbahaya.
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
          <div className="font-bold text-[#263449] flex items-center gap-1.5">
            <span className="text-emerald-600">📥</span>
            <span>Simpan & Ekspor Hasil Belajarmu:</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Klik tombol <strong>.XLSX</strong> di bilah spreadsheet untuk mengunduh workbook sungguhan yang bisa langsung kamu buka di Microsoft Excel desktop atau Google Sheets!
          </p>
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-xl border border-pink-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#263449]">Pilih Template Worksheet</h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Mulai dari lembar kosong atau gunakan data siap latih untuk menguji rumus:
            </p>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              <button
                onClick={handleBlankSheet}
                className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-[#263449]">📄 Lembar Kosong (Blank Sheet)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Mulai dari kisi-kisi bersih tanpa data awal.</div>
              </button>

              {TEMPLATES_DATA.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#263449]">{tmpl.title}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {tmpl.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">{tmpl.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
