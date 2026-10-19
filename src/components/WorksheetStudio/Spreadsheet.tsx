import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Plus,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Calculator,
  Type,
  Maximize2
} from 'lucide-react';
import { GridData, CellData } from '../../types';
import { FormulaEngine, indexToColName, colNameToIndex } from '../../engine/formulaEngine';

interface SpreadsheetProps {
  initialData?: Record<string, string>;
  initialRows?: number;
  initialCols?: number;
  onVerify?: (grid: GridData) => { passed: boolean; message: string; details?: string };
  checkLabel?: string;
  readOnly?: boolean;
  exercisePrompt?: string;
  onOpenBabyLanguage?: (topic?: string) => void;
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  initialData = {},
  initialRows = 12,
  initialCols = 8,
  onVerify,
  checkLabel = 'Periksa Jawaban',
  readOnly = false,
  exercisePrompt,
  onOpenBabyLanguage
}) => {
  const [numRows, setNumRows] = useState(initialRows);
  const [numCols, setNumCols] = useState(initialCols);
  const [activeCell, setActiveCell] = useState<string>('A1');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [formulaBarInput, setFormulaBarInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ passed: boolean; message: string; details?: string } | null>(null);

  // Raw grid state
  const [rawGrid, setRawGrid] = useState<GridData>(() => {
    const grid: GridData = {};
    for (const [key, val] of Object.entries(initialData)) {
      grid[key.toUpperCase()] = {
        raw: String(val),
        computed: null,
      };
    }
    return grid;
  });

  // Re-initialize if initialData changes drastically
  useEffect(() => {
    const grid: GridData = {};
    for (const [key, val] of Object.entries(initialData)) {
      grid[key.toUpperCase()] = {
        raw: String(val),
        computed: null,
      };
    }
    setRawGrid(grid);
    setFeedback(null);
  }, [initialData]);

  // Evaluated grid state
  const [evaluatedGrid, setEvaluatedGrid] = useState<GridData>({});

  // Recalculate on rawGrid changes
  useEffect(() => {
    const engine = new FormulaEngine(rawGrid);
    const calculated = engine.evaluateAll();
    setEvaluatedGrid(calculated);
  }, [rawGrid]);

  // Keep formula bar in sync with active cell
  useEffect(() => {
    const cell = rawGrid[activeCell];
    const val = cell ? cell.raw : '';
    setFormulaBarInput(val);
  }, [activeCell, rawGrid]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (cellKey: string) => {
    if (editingCell && editingCell !== cellKey) {
      commitEdit();
    }
    setActiveCell(cellKey);
  };

  const handleCellDoubleClick = (cellKey: string) => {
    if (readOnly) return;
    setActiveCell(cellKey);
    setEditingCell(cellKey);
    const currentVal = rawGrid[cellKey]?.raw || '';
    setEditValue(currentVal);
  };

  const commitEdit = () => {
    if (!editingCell) return;
    const target = editingCell;
    const val = editValue;
    setRawGrid((prev) => ({
      ...prev,
      [target]: {
        ...prev[target],
        raw: val,
      },
    }));
    setEditingCell(null);
  };

  const handleFormulaBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulaBarInput(e.target.value);
  };

  const handleFormulaBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setRawGrid((prev) => ({
        ...prev,
        [activeCell]: {
          ...prev[activeCell],
          raw: formulaBarInput,
        },
      }));
      // Move to next row
      const col = activeCell.replace(/[0-9]/g, '');
      const row = parseInt(activeCell.replace(/[^0-9]/g, ''), 10);
      setActiveCell(`${col}${Math.min(numRows, row + 1)}`);
    }
  };

  const handleKeyDownGrid = (e: React.KeyboardEvent) => {
    if (editingCell) {
      if (e.key === 'Enter') {
        commitEdit();
        const col = activeCell.replace(/[0-9]/g, '');
        const row = parseInt(activeCell.replace(/[^0-9]/g, ''), 10);
        setActiveCell(`${col}${Math.min(numRows, row + 1)}`);
      } else if (e.key === 'Escape') {
        setEditingCell(null);
      }
      return;
    }

    const colStr = activeCell.replace(/[0-9]/g, '');
    const row = parseInt(activeCell.replace(/[^0-9]/g, ''), 10);
    const colIdx = colNameToIndex(colStr);

    if (e.key === 'ArrowUp' && row > 1) {
      e.preventDefault();
      setActiveCell(`${colStr}${row - 1}`);
    } else if (e.key === 'ArrowDown' && row < numRows) {
      e.preventDefault();
      setActiveCell(`${colStr}${row + 1}`);
    } else if (e.key === 'ArrowLeft' && colIdx > 0) {
      e.preventDefault();
      setActiveCell(`${indexToColName(colIdx - 1)}${row}`);
    } else if (e.key === 'ArrowRight' && colIdx < numCols - 1) {
      e.preventDefault();
      setActiveCell(`${indexToColName(colIdx + 1)}${row}`);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setEditingCell(activeCell);
      setEditValue(rawGrid[activeCell]?.raw || '');
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      setRawGrid((prev) => {
        const next = { ...prev };
        delete next[activeCell];
        return next;
      });
      setFormulaBarInput('');
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Start typing directly into active cell
      if (!readOnly) {
        setEditingCell(activeCell);
        setEditValue(e.key);
      }
    }
  };

  const handleAddRow = () => setNumRows((prev) => Math.min(prev + 1, 50));
  const handleAddCol = () => setNumCols((prev) => Math.min(prev + 1, 20));

  const handleDeleteRow = () => {
    if (numRows <= 3) return;
    const targetRow = parseInt(activeCell.replace(/[^0-9]/g, ''), 10);
    setRawGrid((prev) => {
      const next: GridData = {};
      for (const [k, v] of Object.entries(prev)) {
        const col = k.replace(/[0-9]/g, '');
        const r = parseInt(k.replace(/[^0-9]/g, ''), 10);
        if (r < targetRow) next[k] = v;
        else if (r > targetRow) next[`${col}${r - 1}`] = v;
      }
      return next;
    });
    setNumRows((prev) => prev - 1);
  };

  const handleDeleteCol = () => {
    if (numCols <= 2) return;
    const colStr = activeCell.replace(/[0-9]/g, '');
    const targetColIdx = colNameToIndex(colStr);
    setRawGrid((prev) => {
      const next: GridData = {};
      for (const [k, v] of Object.entries(prev)) {
        const col = k.replace(/[0-9]/g, '');
        const r = parseInt(k.replace(/[^0-9]/g, ''), 10);
        const cIdx = colNameToIndex(col);
        if (cIdx < targetColIdx) next[k] = v;
        else if (cIdx > targetColIdx) next[`${indexToColName(cIdx - 1)}${r}`] = v;
      }
      return next;
    });
    setNumCols((prev) => prev - 1);
  };

  const handleClearSheet = () => {
    if (confirm('Bersihkan seluruh lembar kerja ini?')) {
      setRawGrid({});
      setFormulaBarInput('');
      setFeedback(null);
    }
  };

  const handleExportXLSX = () => {
    try {
      const aoa: any[][] = [];
      for (let r = 1; r <= numRows; r++) {
        const rowData: any[] = [];
        for (let c = 0; c < numCols; c++) {
          const key = `${indexToColName(c)}${r}`;
          const cell = evaluatedGrid[key];
          rowData.push(cell ? (cell.computed !== null ? cell.computed : cell.raw) : '');
        }
        aoa.push(rowData);
      }
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'ExcelQuest_Sheet');
      XLSX.writeFile(wb, 'ExcelQuest_Worksheet.xlsx');
    } catch (err) {
      console.error('Export error:', err);
      alert('Gagal mengekspor file Excel.');
    }
  };

  const handleExportCSV = () => {
    try {
      const rows: string[] = [];
      for (let r = 1; r <= numRows; r++) {
        const cols: string[] = [];
        for (let c = 0; c < numCols; c++) {
          const key = `${indexToColName(c)}${r}`;
          const cell = evaluatedGrid[key];
          const val = cell ? (cell.computed !== null ? cell.computed : cell.raw) : '';
          const escaped = `"${String(val).replace(/"/g, '""')}"`;
          cols.push(escaped);
        }
        rows.push(cols.join(','));
      }
      const csvContent = 'data:text/csv;charset=utf-8,' + rows.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'ExcelQuest_Export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('CSV export error:', err);
    }
  };

  const handleVerifyClick = () => {
    if (onVerify) {
      const res = onVerify(evaluatedGrid);
      setFeedback(res);
    }
  };

  const insertQuickFunction = (funcName: string) => {
    const cellValue = rawGrid[activeCell]?.raw || '';
    const newFormula = `=${funcName}()`;
    setRawGrid((prev) => ({
      ...prev,
      [activeCell]: {
        ...prev[activeCell],
        raw: newFormula,
      },
    }));
    setFormulaBarInput(newFormula);
    setEditingCell(activeCell);
    setEditValue(newFormula);
  };

  return (
    <div
      className="flex flex-col bg-white border border-[#DDECFF] rounded-2xl shadow-sm overflow-hidden focus:outline-none"
      onKeyDown={handleKeyDownGrid}
      tabIndex={0}
    >
      {/* Exercise Prompt Callout if provided */}
      {exercisePrompt && (
        <div className="p-4 bg-[#FFFAFD] border-b border-[#F8DCE9] flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F8DCE9] text-[#263449] rounded-xl shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-pink-600">Instruksi Latihan</div>
              <p className="text-sm text-[#263449] mt-0.5 font-medium">{exercisePrompt}</p>
            </div>
          </div>
          {onOpenBabyLanguage && (
            <button
              onClick={() => onOpenBabyLanguage()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>🧸 Bahasa Bayi</span>
            </button>
          )}
        </div>
      )}

      {/* Spreadsheet Toolbar */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Action controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={handleAddRow}
              title="Tambah Baris"
              className="px-2 py-1 text-slate-700 hover:bg-slate-100 rounded flex items-center gap-1 font-medium"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" /> +Baris
            </button>
            <button
              onClick={handleAddCol}
              title="Tambah Kolom"
              className="px-2 py-1 text-slate-700 hover:bg-slate-100 rounded flex items-center gap-1 font-medium"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" /> +Kolom
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1" />
            <button
              onClick={handleDeleteRow}
              title="Hapus Baris Aktif"
              className="p-1 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleClearSheet}
              title="Bersihkan Sheet"
              className="p-1 text-slate-600 hover:bg-slate-100 rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick formula shortcuts */}
          <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-400 px-1 font-mono">fx:</span>
            {['SUM', 'AVERAGE', 'IF', 'COUNT', 'VLOOKUP'].map((fn) => (
              <button
                key={fn}
                onClick={() => insertQuickFunction(fn)}
                className="px-2 py-0.5 text-[11px] font-mono text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded transition-colors"
              >
                {fn}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Export & Verify button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden">
            <button
              onClick={handleExportXLSX}
              className="px-2.5 py-1.5 text-slate-700 hover:bg-slate-100 flex items-center gap-1 font-medium"
              title="Download file .xlsx"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" /> .XLSX
            </button>
            <button
              onClick={handleExportCSV}
              className="px-2 py-1.5 text-slate-600 hover:bg-slate-100 border-l border-slate-200 font-mono text-[11px]"
              title="Download file CSV"
            >
              CSV
            </button>
          </div>

          {onVerify && (
            <button
              onClick={handleVerifyClick}
              className="px-4 py-1.5 bg-[#263449] hover:bg-[#1a2534] text-white font-medium rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{checkLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Formula Bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-200 flex items-center gap-3">
        {/* Cell coordinate badge */}
        <div className="w-16 px-2 py-1 bg-slate-100 border border-slate-300 rounded font-mono font-semibold text-xs text-slate-800 text-center select-none">
          {activeCell}
        </div>

        {/* fx symbol */}
        <div className="font-mono italic font-bold text-slate-400 select-none text-sm">
          fx
        </div>

        {/* Formula Input */}
        <input
          type="text"
          value={formulaBarInput}
          onChange={handleFormulaBarChange}
          onKeyDown={handleFormulaBarKeyDown}
          placeholder="Ketik rumus (diawali =) atau teks nilai di sini..."
          className="flex-1 text-xs font-mono px-2.5 py-1 rounded bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white text-slate-900"
        />
      </div>

      {/* Feedback Banner if verified */}
      {feedback && (
        <div
          className={`px-4 py-3 flex items-start gap-3 border-b text-sm transition-all ${
            feedback.passed
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="mt-0.5">
            {feedback.passed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <HelpCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold">{feedback.passed ? 'Jawaban Tepat! 🎉' : 'Perlu Diperbaiki 💡'}</div>
            <p className="text-xs mt-0.5 leading-relaxed">{feedback.message}</p>
            {feedback.details && (
              <p className="text-xs mt-1 text-slate-600 bg-white/60 p-2 rounded border border-current/20 font-mono">
                {feedback.details}
              </p>
            )}
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs underline text-slate-500 hover:text-slate-800"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Interactive Grid Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[460px] relative select-none">
        <table className="w-full border-collapse border border-slate-200 text-xs">
          <thead>
            <tr className="bg-slate-100/90 text-slate-600 sticky top-0 z-10 font-mono">
              {/* Corner header */}
              <th className="w-12 min-w-12 h-7 border border-slate-300 bg-slate-200/80 text-[11px] text-center font-medium">
                #
              </th>
              {/* Column headers (A, B, C...) */}
              {Array.from({ length: numCols }).map((_, cIdx) => {
                const colLetter = indexToColName(cIdx);
                const isActiveCol = activeCell.startsWith(colLetter);
                return (
                  <th
                    key={colLetter}
                    className={`min-w-28 h-7 border border-slate-300 text-center font-semibold text-[11px] px-2 ${
                      isActiveCol ? 'bg-sky-100 text-sky-800' : 'bg-slate-100'
                    }`}
                  >
                    {colLetter}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numRows }).map((_, rIdx) => {
              const rowNum = rIdx + 1;
              const isActiveRow = parseInt(activeCell.replace(/[^0-9]/g, ''), 10) === rowNum;

              return (
                <tr key={rowNum} className="hover:bg-slate-50/50">
                  {/* Row number header */}
                  <td
                    className={`h-7 border border-slate-300 text-center font-mono text-[11px] font-medium text-slate-500 ${
                      isActiveRow ? 'bg-sky-100 text-sky-800 font-bold' : 'bg-slate-100'
                    }`}
                  >
                    {rowNum}
                  </td>

                  {/* Row cells */}
                  {Array.from({ length: numCols }).map((_, cIdx) => {
                    const colLetter = indexToColName(cIdx);
                    const cellKey = `${colLetter}${rowNum}`;
                    const isSelected = activeCell === cellKey;
                    const isEditing = editingCell === cellKey;
                    const cellObj = evaluatedGrid[cellKey];
                    const rawVal = rawGrid[cellKey]?.raw || '';

                    // Display value
                    let displayVal = '';
                    let isError = false;
                    if (cellObj) {
                      if (cellObj.error) {
                        displayVal = cellObj.error;
                        isError = true;
                      } else if (cellObj.computed !== null && cellObj.computed !== undefined) {
                        if (typeof cellObj.computed === 'number') {
                          // Format nicely with thousand separator if integer or clean decimals
                          displayVal = Number.isInteger(cellObj.computed)
                            ? cellObj.computed.toLocaleString('id-ID')
                            : cellObj.computed.toFixed(2);
                        } else {
                          displayVal = String(cellObj.computed);
                        }
                      } else {
                        displayVal = rawVal;
                      }
                    }

                    // Numeric alignment
                    const isNum = !isNaN(Number(cellObj?.computed)) && cellObj?.computed !== null && cellObj?.computed !== '';

                    return (
                      <td
                        key={cellKey}
                        onClick={() => handleCellClick(cellKey)}
                        onDoubleClick={() => handleCellDoubleClick(cellKey)}
                        className={`h-7 border border-slate-200 px-2 text-xs relative cursor-cell transition-colors font-sans tabular-nums ${
                          isNum ? 'text-right' : 'text-left'
                        } ${
                          isSelected
                            ? 'outline-2 outline-sky-500 outline-offset-[-2px] bg-sky-50/60 z-10'
                            : ''
                        } ${isError ? 'text-rose-600 font-mono font-bold bg-rose-50/40' : 'text-slate-800'}`}
                      >
                        {isEditing ? (
                          <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={commitEdit}
                            className="absolute inset-0 w-full h-full px-2 text-xs font-mono bg-white outline-none ring-2 ring-sky-500 z-20 text-slate-900"
                          />
                        ) : (
                          <span className="truncate block">{displayVal}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span>
            Sel aktif: <strong className="font-mono text-slate-700">{activeCell}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Nilai: <strong className="font-mono text-slate-700">{evaluatedGrid[activeCell]?.computed ?? rawGrid[activeCell]?.raw ?? 'Kosong'}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="hidden sm:inline">Navigasi: Panah Keyboard / Enter untuk edit</span>
          <span className="bg-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-600">
            {numRows}R x {numCols}C
          </span>
        </div>
      </div>
    </div>
  );
};
