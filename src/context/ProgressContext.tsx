import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  addXP: (amount: number, reason: string) => void;
  completeLesson: (moduleId: string, xp: number, title: string) => void;
  completeQuest: (questId: string, xp: number, title: string) => void;
  completeProject: (projectId: string, xp: number, title: string) => void;
  toggleMasteredFlashcard: (cardId: string) => void;
  resetProgress: () => void;
  levelTitle: string;
  levelRank: number;
  nextLevelXP: number;
  progressPercent: number;
  triggerCelebration: () => void;
}

const STORAGE_KEY = 'excelquest_user_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  completedQuests: [],
  completedProjects: [],
  masteredFlashcards: [],
  badges: [],
  history: [
    {
      id: 'init-1',
      date: new Date().toISOString().split('T')[0],
      action: 'Mulai petualangan di ExcelQuest!',
      xpGained: 0
    }
  ]
};

const ALL_BADGES = [
  { id: 'first_step', name: 'Langkah Pertama', description: 'Menyelesaikan modul pembelajaran pertama', icon: '🌱' },
  { id: 'sum_master', name: 'Master SUM', description: 'Menyelesaikan latihan penjumlahan otomatis', icon: '➕' },
  { id: 'logic_guru', name: 'Logika Cerdas', description: 'Menyelesaikan latihan rumus IF bersyarat', icon: '⚡' },
  { id: 'quest_hunter', name: 'Pemburu Quest', description: 'Menuntaskan misi harian Daily Quest', icon: '🎯' },
  { id: 'project_builder', name: 'Arsitek Proyek', description: 'Menyelesaikan studi kasus di Project Lab', icon: '💼' },
  { id: 'data_hero', name: 'Excel Data Hero', description: 'Mencapai lebih dari 1000 XP', icon: '👑' }
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load progress from localStorage:', e);
    }
    return INITIAL_PROGRESS;
  });

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  // Streak calculation on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const lastDate = new Date(progress.lastActiveDate);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        setProgress((prev) => ({
          ...prev,
          streakDays: prev.streakDays + 1,
          lastActiveDate: today,
        }));
      } else if (diffDays > 1) {
        // Streak reset
        setProgress((prev) => ({
          ...prev,
          streakDays: 1,
          lastActiveDate: today,
        }));
      }
    }
  }, []);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#F8DCE9', '#DDECFF', '#96C2EC', '#E8A8C7', '#FFD166']
      });
    } catch {
      // fallback safe
    }
  };

  const checkBadgeUnlocks = (newProgress: UserProgress) => {
    const unlockedBadges = [...newProgress.badges];
    const today = new Date().toISOString().split('T')[0];

    const giveBadge = (id: string) => {
      if (!unlockedBadges.some((b) => b.id === id)) {
        const badgeDef = ALL_BADGES.find((b) => b.id === id);
        if (badgeDef) {
          unlockedBadges.push({
            ...badgeDef,
            unlockedAt: today
          });
        }
      }
    };

    if (newProgress.completedLessons.length >= 1) giveBadge('first_step');
    if (newProgress.completedLessons.some((id) => id.includes('m4') || id.includes('m3'))) giveBadge('sum_master');
    if (newProgress.completedLessons.some((id) => id.includes('l2'))) giveBadge('logic_guru');
    if (newProgress.completedQuests.length >= 1) giveBadge('quest_hunter');
    if (newProgress.completedProjects.length >= 1) giveBadge('project_builder');
    if (newProgress.xp >= 1000) giveBadge('data_hero');

    return unlockedBadges;
  };

  const addXP = (amount: number, reason: string) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newHistory = [
        {
          id: `act-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          action: reason,
          xpGained: amount
        },
        ...prev.history
      ].slice(0, 30);

      const updated = {
        ...prev,
        xp: newXP,
        history: newHistory
      };
      updated.badges = checkBadgeUnlocks(updated);
      return updated;
    });
  };

  const completeLesson = (moduleId: string, xp: number, title: string) => {
    if (progress.completedLessons.includes(moduleId)) {
      // already completed, still give feedback
      return;
    }
    triggerCelebration();
    setProgress((prev) => {
      const updatedLessons = [...prev.completedLessons, moduleId];
      const newXP = prev.xp + xp;
      const newHistory = [
        {
          id: `mod-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          action: `Menyelesaikan Modul: ${title}`,
          xpGained: xp
        },
        ...prev.history
      ].slice(0, 30);

      const updated = {
        ...prev,
        completedLessons: updatedLessons,
        xp: newXP,
        history: newHistory
      };
      updated.badges = checkBadgeUnlocks(updated);
      return updated;
    });
  };

  const completeQuest = (questId: string, xp: number, title: string) => {
    if (!progress.completedQuests.includes(questId)) {
      triggerCelebration();
      setProgress((prev) => {
        const updatedQuests = [...prev.completedQuests, questId];
        const newXP = prev.xp + xp;
        const newHistory = [
          {
            id: `qst-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            action: `Menuntaskan Daily Quest: ${title}`,
            xpGained: xp
          },
          ...prev.history
        ].slice(0, 30);

        const updated = {
          ...prev,
          completedQuests: updatedQuests,
          xp: newXP,
          history: newHistory
        };
        updated.badges = checkBadgeUnlocks(updated);
        return updated;
      });
    }
  };

  const completeProject = (projectId: string, xp: number, title: string) => {
    if (!progress.completedProjects.includes(projectId)) {
      triggerCelebration();
      setProgress((prev) => {
        const updatedProjects = [...prev.completedProjects, projectId];
        const newXP = prev.xp + xp;
        const newHistory = [
          {
            id: `prj-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            action: `Menyelesaikan Proyek Lab: ${title}`,
            xpGained: xp
          },
          ...prev.history
        ].slice(0, 30);

        const updated = {
          ...prev,
          completedProjects: updatedProjects,
          xp: newXP,
          history: newHistory
        };
        updated.badges = checkBadgeUnlocks(updated);
        return updated;
      });
    }
  };

  const toggleMasteredFlashcard = (cardId: string) => {
    setProgress((prev) => {
      const exists = prev.masteredFlashcards.includes(cardId);
      const updatedCards = exists
        ? prev.masteredFlashcards.filter((id) => id !== cardId)
        : [...prev.masteredFlashcards, cardId];
      return {
        ...prev,
        masteredFlashcards: updatedCards
      };
    });
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(INITIAL_PROGRESS);
  };

  // Level calculation
  let levelTitle = 'Excel Novice (Pemula)';
  let levelRank = 1;
  let nextLevelXP = 200;
  let currentLevelBaseXP = 0;

  if (progress.xp >= 1500) {
    levelTitle = 'Excel Data Hero (Legenda)';
    levelRank = 5;
    nextLevelXP = 2500;
    currentLevelBaseXP = 1500;
  } else if (progress.xp >= 900) {
    levelTitle = 'Spreadsheet Wizard (Ahli)';
    levelRank = 4;
    nextLevelXP = 1500;
    currentLevelBaseXP = 900;
  } else if (progress.xp >= 500) {
    levelTitle = 'Data Apprentice (Praktisi)';
    levelRank = 3;
    nextLevelXP = 900;
    currentLevelBaseXP = 500;
  } else if (progress.xp >= 200) {
    levelTitle = 'Formula Explorer (Penjelajah)';
    levelRank = 2;
    nextLevelXP = 500;
    currentLevelBaseXP = 200;
  }

  const rangeXP = nextLevelXP - currentLevelBaseXP;
  const earnedInLevel = Math.max(0, progress.xp - currentLevelBaseXP);
  const progressPercent = Math.min(100, Math.round((earnedInLevel / rangeXP) * 100));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        addXP,
        completeLesson,
        completeQuest,
        completeProject,
        toggleMasteredFlashcard,
        resetProgress,
        levelTitle,
        levelRank,
        nextLevelXP,
        progressPercent,
        triggerCelebration
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
