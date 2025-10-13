import { ChevronLeft, ChevronRight, RotateCw, X, Languages, Volume2 } from 'lucide-react';
import { useFlashcard } from '../hooks/use-flashcard';
import type { HSKLevel } from '../interfaces/HSKLevel';
import { useState, useEffect } from 'react';

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

  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState<{full: string, words: Array<{char: string, meaning: string}>}>({full: '', words: []});
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    setShowTranslation(false);
    setTranslation({full: '', words: []});
    setIsTranslating(false);
  }, [currentIndex]);

  const handleTranslate = async () => {
    if (currentCard && !isTranslating) {
      setIsTranslating(true);
      try {
        const fullResponse = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(currentCard.simplified)}&langpair=zh|en`
        );
        const fullData = await fullResponse.json();
        const fullTranslation = fullData.responseData?.translatedText || 'Translation unavailable';
        
        const characters = currentCard.simplified.split('');
        const wordPromises = characters.map(async (char) => {
          try {
            const response = await fetch(
              `https://api.mymemory.translated.net/get?q=${encodeURIComponent(char)}&langpair=zh|en`
            );
            const data = await response.json();
            return {
              char,
              meaning: data.responseData?.translatedText || char
            };
          } catch {
            return { char, meaning: char };
          }
        });
        
        const words = await Promise.all(wordPromises);
        
        setTranslation({ full: fullTranslation, words });
        setShowTranslation(true);
      } catch (error) {
        setTranslation({ full: 'Translation unavailable', words: [] });
        setShowTranslation(true);
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const handlePlayAudio = () => {
    if (currentCard) {
      const utterance = new SpeechSynthesisUtterance(currentCard.simplified);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

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
                <div className="text-5xl md:text-8xl font-bold text-navy" style={{ fontFamily: 'SimSun, "Microsoft YaHei", "PingFang SC", STXihei, sans-serif' }}>
                  {currentCard.simplified}
                </div>
                <div className="text-xl md:text-3xl text-teal font-medium">
                  {currentCard.pinyin}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy text-white hover:bg-teal transition-all text-sm md:text-base"
                  >
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Listen</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTranslate();
                    }}
                    disabled={isTranslating}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-teal text-white hover:bg-green transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Languages className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
                  </button>
                </div>
                {showTranslation && translation.full && (
                  <div className="mt-4 px-4 py-3 bg-green/10 rounded-lg border-2 border-green max-w-md w-full">
                    <div className="text-sm md:text-base text-navy font-bold mb-3">
                      Full: {translation.full}
                    </div>
                    {translation.words.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs md:text-sm text-teal font-semibold">Word by word:</div>
                        <div className="flex flex-wrap gap-2">
                          {translation.words.map((word, idx) => (
                            <div key={idx} className="bg-white px-3 py-2 rounded-md shadow-sm">
                              <div className="text-base md:text-lg font-bold text-navy" style={{ fontFamily: 'SimSun, "Microsoft YaHei", "PingFang SC", STXihei, sans-serif' }}>
                                {word.char}
                              </div>
                              <div className="text-xs md:text-sm text-gray-600">
                                {word.meaning}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="absolute bottom-4 md:bottom-6 text-xs md:text-sm text-gray-500 flex items-center space-x-2">
                  <RotateCw className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Click to flip</span>
                </div>
              </div>

              <div
                className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green to-teal rounded-2xl md:rounded-3xl card-shadow p-6 md:p-12 flex flex-col items-center justify-center overflow-y-auto"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="text-center space-y-3 md:space-y-6 w-full max-w-lg">
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
                  <div className="flex items-center gap-3 justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio();
                      }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-navy hover:bg-navy hover:text-white transition-all text-sm md:text-base"
                    >
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Listen</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTranslate();
                      }}
                      disabled={isTranslating}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-teal hover:bg-navy hover:text-white transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Languages className="w-4 h-4 md:w-5 md:h-5" />
                      <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
                    </button>
                  </div>
                  {showTranslation && translation.full && (
                    <div className="mt-4 px-4 py-3 bg-white/20 rounded-lg border-2 border-white backdrop-blur-sm w-full">
                      <div className="text-sm md:text-base text-white font-bold mb-3">
                        Full: {translation.full}
                      </div>
                      {translation.words.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs md:text-sm text-white/90 font-semibold">Word by word:</div>
                          <div className="flex flex-wrap gap-2">
                            {translation.words.map((word, idx) => (
                              <div key={idx} className="bg-white/30 backdrop-blur-sm px-3 py-2 rounded-md">
                                <div className="text-base md:text-lg font-bold text-white" style={{ fontFamily: 'SimSun, "Microsoft YaHei", "PingFang SC", STXihei, sans-serif' }}>
                                  {word.char}
                                </div>
                                <div className="text-xs md:text-sm text-white/90">
                                  {word.meaning}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 md:space-x-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white text-navy hover:bg-green hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy text-sm md:text-base font-medium"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Previous</span>
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
            className="flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-white text-navy hover:bg-green hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy text-sm md:text-base font-medium"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
