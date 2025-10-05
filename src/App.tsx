import { useState } from 'react';
import { ChooseMode } from './components/choose-mode';
import { LevelSelector } from './components/level-selector';
import { FlashcardView } from './components/flashcard-view';
import { QuizView } from './components/quiz-view';
import type { Mode } from './interfaces/Mode';
import type { HSKLevel } from './interfaces/HSKLevel';

type AppState = 'mode-selection' | 'level-selection' | 'learning';

function App() {
  const [appState, setAppState] = useState<AppState>('mode-selection');
  const [selectedMode, setSelectedMode] = useState<Mode | undefined>();
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel | undefined>();

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setAppState('level-selection');
  };

  const handleLevelSelect = (level: HSKLevel) => {
    setSelectedLevel(level);
    setAppState('learning');
  };

  const handleBack = () => {
    if (appState === 'learning') {
      setAppState('level-selection');
    } else if (appState === 'level-selection') {
      setAppState('mode-selection');
      setSelectedMode(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-mint">
      {appState === 'mode-selection' && (
        <div className="min-h-screen flex items-center justify-center">
          <ChooseMode 
            onSelectMode={handleModeSelect}
            selectedMode={selectedMode}
          />
        </div>
      )}

      {appState === 'level-selection' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full">
            <div className="text-center mb-8">
              <button
                onClick={handleBack}
                className="text-teal hover:text-navy transition-colors font-medium"
              >
                ← Back to Mode Selection
              </button>
            </div>
            <LevelSelector 
              onSelectLevel={handleLevelSelect}
              selectedLevel={selectedLevel}
            />
          </div>
        </div>
      )}

      {appState === 'learning' && selectedMode && selectedLevel && (
        <>
          {selectedMode === 'flashcard' ? (
            <FlashcardView level={selectedLevel} onBack={handleBack} />
          ) : (
            <QuizView level={selectedLevel} onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
}

export default App;

