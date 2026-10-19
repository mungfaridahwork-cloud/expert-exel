import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBabyLanguage: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBabyLanguage }) => {
  return (
    <footer className="bg-white border-t border-[#F8DCE9] py-12 px-4 sm:px-6 lg:px-8 mt-16 text-[#5E6D80] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-sm font-extrabold text-[#263449] flex items-center gap-2">
            <span>ExcelQuest</span>
            <span className="text-slate-300 font-normal">·</span>
            <span className="text-xs font-normal text-[#5E6D80]">Play. Practice. Master Excel.</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Platform pembelajaran Microsoft Excel interaktif dengan penjelasan bahasa bayi & spreadsheet studio.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium">
          <button onClick={() => setActiveTab('learning-path')} className="hover:text-[#263449] transition-colors">
            Learning Path
          </button>
          <button onClick={() => setActiveTab('worksheet-studio')} className="hover:text-[#263449] transition-colors">
            Worksheet Studio
          </button>
          <button onClick={() => setActiveTab('daily-quest')} className="hover:text-[#263449] transition-colors">
            Daily Quest
          </button>
          <button onClick={() => setActiveTab('project-lab')} className="hover:text-[#263449] transition-colors">
            Project Lab
          </button>
          <button onClick={() => setActiveTab('formula-finder')} className="hover:text-[#263449] transition-colors">
            Formula Finder
          </button>
          <button onClick={onOpenBabyLanguage} className="text-pink-600 font-semibold hover:underline">
            Tools Bahasa Bayi 🧸
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-400">
          © 2026 ExcelQuest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
