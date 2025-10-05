import { ChevronLeft, ChevronRight, RotateCw, X } from 'lucide-react';
import { useFlashcard } from '../hooks/use-flashcard';
import type { HSKLevel } from '../interfaces/HSKLevel';

interface FlashcardViewProps {
  level: HSKLevel;
  onBack: () => void;
}

export const FlashcardView = ({ level, onBack }: FlashcardViewProps) => {
  const {
    currentCard,
    currentIndex,
    totalCards,
    isFlipped,
    isLoading,
    goToNext,
    goToPrevious,
    flipCard,
  } = useFlashcard(level);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mint flex items-center justify-center">
        <div className="text-2xl text-navy font-medium">Loading...</div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-mint flex items-center justify-center">
        <div className="text-2xl text-navy font-medium">No cards available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mint flex flex-col">
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl bg-white text-navy hover:bg-green hover:text-white transition-all card-shadow text-sm md:text-base"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium">Exit</span>
          </button>
          
          <div className="text-sm md:text-lg font-medium text-navy">
            HSK Level {level}
          </div>

          <div className="text-sm md:text-lg font-medium text-teal">
            {currentIndex + 1} / {totalCards}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center mb-6 md:mb-8">
          <div
            onClick={flipCard}
            className="relative w-full max-w-2xl aspect-[3/2] cursor-pointer perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <div
              className={`w-full h-full relative transition-transform duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="absolute w-full h-full backface-hidden bg-white rounded-2xl md:rounded-3xl card-shadow p-6 md:p-12 flex flex-col items-center justify-center space-y-3 md:space-y-6"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-5xl md:text-8xl font-bold text-navy">
                  {currentCard.simplified}
                </div>
                <div className="text-xl md:text-3xl text-teal font-medium">
                  {currentCard.pinyin}
                </div>
                <div className="absolute bottom-4 md:bottom-6 text-xs md:text-sm text-gray-500 flex items-center space-x-2">
                  <RotateCw className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Click to flip</span>
                </div>
              </div>

              <div
                className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green to-teal rounded-2xl md:rounded-3xl card-shadow p-6 md:p-12 flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="text-center space-y-3 md:space-y-6">
                  <div className="text-lg md:text-2xl text-white/80 font-medium">
                    {currentCard.pinyin}
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {currentCard.meanings.map((meaning, idx) => (
                      <div key={idx} className="text-base md:text-xl text-white">
                        {idx + 1}. {meaning}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 md:space-x-6">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-2 md:p-4 rounded-lg md:rounded-xl bg-white text-navy hover:bg-green hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={flipCard}
            className="px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-gradient-to-r from-green to-teal text-white font-medium text-sm md:text-lg hover:shadow-lg transition-all card-shadow"
          >
            Flip Card
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === totalCards - 1}
            className="p-2 md:p-4 rounded-lg md:rounded-xl bg-white text-navy hover:bg-green hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};
