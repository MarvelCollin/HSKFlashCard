import type { Mode } from '../interfaces/Mode';
import { BookOpen, CheckSquare } from 'lucide-react';

interface ChooseModeProps {
  onSelectMode: (mode: Mode) => void;
  selectedMode?: Mode;
}

export const ChooseMode = ({ onSelectMode, selectedMode }: ChooseModeProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-3 md:mb-4 text-center">
        HSK Flashcard
      </h1>
      <p className="text-base md:text-lg text-teal mb-8 md:mb-12 text-center">
        Choose your learning mode
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <button
          onClick={() => onSelectMode('flashcard')}
          className={`
            group relative p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 ease-in-out
            card-shadow hover:scale-105 active:scale-95
            ${selectedMode === 'flashcard'
              ? 'bg-gradient-to-br from-green to-teal text-white'
              : 'bg-white text-navy hover:bg-mint'
            }
          `}
        >
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <BookOpen 
              className={`w-12 h-12 md:w-16 md:h-16 ${
                selectedMode === 'flashcard' ? 'text-white' : 'text-green'
              }`} 
            />
            <h2 className="text-xl md:text-2xl font-bold">Flashcard Mode</h2>
            <p className={`text-sm md:text-base text-center ${
              selectedMode === 'flashcard' ? 'text-white/80' : 'text-teal'
            }`}>
              Learn vocabulary with interactive flashcards
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelectMode('quiz')}
          className={`
            group relative p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 ease-in-out
            card-shadow hover:scale-105 active:scale-95
            ${selectedMode === 'quiz'
              ? 'bg-gradient-to-br from-teal to-navy text-white'
              : 'bg-white text-navy hover:bg-mint'
            }
          `}
        >
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <CheckSquare 
              className={`w-12 h-12 md:w-16 md:h-16 ${
                selectedMode === 'quiz' ? 'text-white' : 'text-teal'
              }`} 
            />
            <h2 className="text-xl md:text-2xl font-bold">Quiz Mode</h2>
            <p className={`text-sm md:text-base text-center ${
              selectedMode === 'quiz' ? 'text-white/80' : 'text-teal'
            }`}>
              Test your knowledge with multiple choice questions
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
