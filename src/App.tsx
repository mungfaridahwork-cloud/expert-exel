import React, { useState } from 'react';
import { ActiveTab } from './types';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BabyLanguageModal } from './components/BabyLanguageModal';
import { HomePage } from './pages/HomePage';
import { LearningPathPage } from './pages/LearningPathPage';
import { WorksheetStudioPage } from './pages/WorksheetStudioPage';
import { DailyQuestPage } from './pages/DailyQuestPage';
import { ProjectLabPage } from './pages/ProjectLabPage';
import { FormulaFinderPage } from './pages/FormulaFinderPage';
import { ToolsPage } from './pages/ToolsPage';
import { MyProgressPage } from './pages/MyProgressPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [babyLanguageOpen, setBabyLanguageOpen] = useState<boolean>(false);
  const [babyLanguageTopic, setBabyLanguageTopic] = useState<string>('cell');

  // When jumping from other tabs to Worksheet Studio with preloaded data
  const [worksheetPresetData, setWorksheetPresetData] = useState<Record<string, string> | undefined>(undefined);
  const [worksheetTargetCell, setWorksheetTargetCell] = useState<string | undefined>(undefined);

  const handleOpenBabyLanguage = (topic?: string) => {
    if (topic) {
      setBabyLanguageTopic(topic);
    }
    setBabyLanguageOpen(true);
  };

  const handleJumpToWorksheetStudio = (presetData?: Record<string, string>, targetCell?: string) => {
    if (presetData) {
      setWorksheetPresetData(presetData);
      setWorksheetTargetCell(targetCell);
    }
    setActiveTab('worksheet-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (newTab: ActiveTab) => {
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ProgressProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFAFD] text-[#263449] selection:bg-[#F8DCE9] selection:text-[#263449]">
        {/* Main Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onOpenBabyLanguage={() => handleOpenBabyLanguage('cell')}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomePage
              setActiveTab={handleTabChange}
              onOpenBabyLanguage={handleOpenBabyLanguage}
            />
          )}

          {activeTab === 'learning-path' && (
            <LearningPathPage
              onOpenBabyLanguage={handleOpenBabyLanguage}
              onJumpToWorksheetStudio={handleJumpToWorksheetStudio}
            />
          )}

          {activeTab === 'worksheet-studio' && (
            <WorksheetStudioPage
              onOpenBabyLanguage={handleOpenBabyLanguage}
              presetData={worksheetPresetData}
              targetCell={worksheetTargetCell}
            />
          )}

          {activeTab === 'daily-quest' && (
            <DailyQuestPage
              onOpenBabyLanguage={handleOpenBabyLanguage}
            />
          )}

          {activeTab === 'project-lab' && (
            <ProjectLabPage
              onOpenBabyLanguage={handleOpenBabyLanguage}
              onJumpToWorksheetStudio={handleJumpToWorksheetStudio}
            />
          )}

          {activeTab === 'formula-finder' && (
            <FormulaFinderPage
              onOpenBabyLanguage={handleOpenBabyLanguage}
              onJumpToWorksheetStudio={handleJumpToWorksheetStudio}
            />
          )}

          {activeTab === 'tools' && (
            <ToolsPage
              onOpenBabyLanguage={handleOpenBabyLanguage}
              onJumpToWorksheetStudio={handleJumpToWorksheetStudio}
            />
          )}

          {activeTab === 'my-progress' && (
            <MyProgressPage />
          )}
        </main>

        {/* Global Tools Bahasa Bayi Modal */}
        <BabyLanguageModal
          isOpen={babyLanguageOpen}
          onClose={() => setBabyLanguageOpen(false)}
          initialTopic={babyLanguageTopic}
          onNavigateToWorksheet={handleJumpToWorksheetStudio}
        />

        {/* Footer */}
        <Footer
          setActiveTab={handleTabChange}
          onOpenBabyLanguage={() => handleOpenBabyLanguage('cell')}
        />
      </div>
    </ProgressProvider>
  );
}
