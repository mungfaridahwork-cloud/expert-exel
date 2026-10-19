import React, { useState } from 'react';
import {
  Menu,
  X,
  Flame,
  Sparkles,
  Award,
  BookOpen,
  Table,
  Compass,
  FolderGit2,
  Search,
  Wrench,
  UserCheck
} from 'lucide-react';
import { ActiveTab } from '../types';
import { useProgress } from '../context/ProgressContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBabyLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBabyLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { progress, levelTitle } = useProgress();

  const navItems: { id: ActiveTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'learning-path', label: 'Learning Path', icon: BookOpen },
    { id: 'worksheet-studio', label: 'Worksheet Studio', icon: Table },
    { id: 'daily-quest', label: 'Daily Quest', icon: Flame },
    { id: 'project-lab', label: 'Project Lab', icon: FolderGit2 },
    { id: 'formula-finder', label: 'Formula Finder', icon: Search },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'my-progress', label: 'My Progress', icon: UserCheck }
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFAFD]/95 backdrop-blur-md border-b border-[#F8DCE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-xl font-extrabold tracking-tight text-[#263449] whitespace-nowrap shrink-0 flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F8DCE9] to-[#DDECFF] border border-pink-200 flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
              📊
            </span>
            <span>
              Excel<span className="text-pink-600">Quest</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line prose) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#5E6D80]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#263449] font-bold'
                      : 'hover:text-[#263449]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (Tools Bahasa Bayi + Progress Pill) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Streak & XP counter */}
            <button
              onClick={() => handleNavClick('my-progress')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DDECFF]/70 hover:bg-[#DDECFF] border border-sky-200 text-[#263449] rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{progress.streakDays} Hari</span>
              <span className="text-slate-300">|</span>
              <span className="text-sky-800">{progress.xp} XP</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBabyLanguage}
              className="px-4 py-2 text-xs font-bold text-[#263449] bg-gradient-to-r from-[#F8DCE9] to-[#DDECFF] hover:from-pink-200 hover:to-sky-200 border border-pink-300 rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            >
              <span>🧸 Tools Bahasa Bayi</span>
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBabyLanguage}
              className="p-2 text-xs font-bold bg-[#F8DCE9] text-[#263449] rounded-xl"
            >
              🧸
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#263449] hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F8DCE9] px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Menu Navigasi
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-[#F8DCE9] text-[#263449] font-bold'
                    : 'text-[#5E6D80] hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-pink-600" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-3 text-xs">
            <span className="font-semibold text-slate-600">Streak: {progress.streakDays} Hari</span>
            <span className="font-bold text-pink-600">{progress.xp} XP</span>
          </div>
        </div>
      )}
    </header>
  );
};
