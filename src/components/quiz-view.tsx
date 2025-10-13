import { ChevronLeft, ChevronRight, X, RotateCcw, Trophy, Eye, Languages, Volume2, Headphones, EyeOff } from 'lucide-react';
import { useQuiz } from '../hooks/use-quiz';
import type { HSKLevel } from '../interfaces/HSKLevel';
import { useState, useEffect } from 'react';

interface QuizViewProps {
  level: HSKLevel;
  onBack: () => void;
}

export const QuizView = ({ level, onBack }: QuizViewProps) => {
  const {
    currentQuestion,
    options,
    currentIndex,
    totalQuestions,
    score,
    hasAnswered,
    isRevealed,
    isLoading,
    submitAnswer,
    goToNext,
    goToPrevious,
    resetQuiz,
    revealAnswer,
    getCurrentAnswer,
  } = useQuiz(level);

  const currentAnswer = getCurrentAnswer();

  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState<{full: string, words: Array<{char: string, meaning: string}>}>({full: '', words: []});
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListeningMode, setIsListeningMode] = useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = useState(false);

  useEffect(() => {
    setShowTranslation(false);
    setTranslation({full: '', words: []});
    setIsTranslating(false);
    setIsCharacterRevealed(false);
  }, [currentIndex]);

  const handleTranslate = async () => {
    if (currentQuestion && !isTranslating) {
      setIsTranslating(true);
      try {
        const fullResponse = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(currentQuestion.character)}&langpair=zh|en`
        );
        const fullData = await fullResponse.json();
        const fullTranslation = fullData.responseData?.translatedText || 'Translation unavailable';
        
        const characters = currentQuestion.character.split('');
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
    if (currentQuestion) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.character);
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

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-mint flex items-center justify-center">
        <div className="text-2xl text-navy font-medium">No questions available</div>
      </div>
    );
  }

  const isQuizComplete = currentIndex === totalQuestions - 1 && hasAnswered;

  return (
    <div className="min-h-screen bg-mint flex flex-col">
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl bg-white text-navy hover:bg-teal hover:text-white transition-all card-shadow text-sm md:text-base"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium">Exit</span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <div className="text-sm md:text-lg font-medium text-navy">
              HSK Level {level}
            </div>
            <button
              onClick={() => {
                setIsListeningMode(!isListeningMode);
                setIsCharacterRevealed(false);
              }}
              className={`flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                isListeningMode
                  ? 'bg-gradient-to-r from-green to-teal text-white'
                  : 'bg-white text-navy hover:bg-mint'
              }`}
            >
              <Headphones className="w-3 h-3 md:w-4 md:h-4" />
              <span>{isListeningMode ? 'Listening Mode' : 'Normal Mode'}</span>
            </button>
          </div>

          <div className="text-sm md:text-lg font-medium text-teal">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>

        {isQuizComplete ? (
          <div className="bg-white rounded-2xl md:rounded-3xl card-shadow p-6 md:p-12 text-center space-y-6 md:space-y-8">
            <Trophy className="w-16 h-16 md:w-24 md:h-24 mx-auto text-green" />
            <h2 className="text-2xl md:text-4xl font-bold text-navy">Quiz Complete!</h2>
            <div className="space-y-3 md:space-y-4">
              <div className="text-4xl md:text-6xl font-bold text-green">
                {score.percentage}%
              </div>
              <div className="text-base md:text-xl text-teal">
                {score.correct} out of {score.total} correct
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-gradient-to-r from-green to-teal text-white font-medium text-base md:text-lg hover:shadow-lg transition-all"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-white text-navy border-2 border-navy font-medium text-base md:text-lg hover:bg-navy hover:text-white transition-all"
              >
                Back to Menu
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl md:rounded-3xl card-shadow p-6 md:p-12 mb-6 md:mb-8">
              <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12">
                {isListeningMode && !isCharacterRevealed ? (
                  <>
                    <div className="text-3xl md:text-5xl text-gray-400 mb-4">
                      <EyeOff className="w-16 h-16 md:w-24 md:h-24 mx-auto" />
                    </div>
                    <div className="text-base md:text-xl text-gray-500 font-medium">
                      Listen and guess the character
                    </div>
                    <button
                      onClick={() => setIsCharacterRevealed(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy text-white hover:bg-teal transition-all text-sm md:text-base mt-4"
                    >
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Show Character</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-5xl md:text-7xl font-bold text-navy" style={{ fontFamily: 'SimSun, "Microsoft YaHei", "PingFang SC", STXihei, sans-serif' }}>
                      {currentQuestion.character}
                    </div>
                    <div className="text-xl md:text-3xl text-teal font-medium">
                      {currentQuestion.pinyin}
                    </div>
                  </>
                )}
                <div className="flex items-center gap-3 justify-center">
                  <button
                    onClick={handlePlayAudio}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy text-white hover:bg-teal transition-all text-sm md:text-base"
                  >
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Listen</span>
                  </button>
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-teal text-white hover:bg-green transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Languages className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
                  </button>
                </div>
                {showTranslation && translation.full && (
                  <div className="mt-4 px-4 py-3 bg-green/10 rounded-lg border-2 border-green max-w-2xl mx-auto">
                    <div className="text-sm md:text-base text-navy font-bold mb-3">
                      Full: {translation.full}
                    </div>
                    {translation.words.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs md:text-sm text-teal font-semibold">Word by word:</div>
                        <div className="flex flex-wrap gap-2 justify-center">
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
                <div className="text-sm md:text-lg text-gray-600">
                  What does this character mean?
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {options.map((option, idx) => {
                  const isCorrect = option.isCorrect;
                  const isUserAnswer = currentAnswer?.userAnswer === option.text;
                  const letters = ['A', 'B', 'C', 'D'];

                  let buttonClass = 'bg-white text-navy hover:bg-mint border-2 border-transparent';
                  
                  if (hasAnswered || isRevealed) {
                    if (isCorrect) {
                      buttonClass = 'bg-gradient-to-br from-green to-teal text-white border-2 border-green';
                    } else if (isUserAnswer && !isCorrect) {
                      buttonClass = 'bg-red-100 text-red-700 border-2 border-red-400';
                    } else {
                      buttonClass = 'bg-gray-100 text-gray-500 border-2 border-transparent';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isListeningMode && !isCharacterRevealed) {
                          setIsCharacterRevealed(true);
                        }
                        submitAnswer(option.text);
                      }}
                      disabled={hasAnswered || isRevealed}
                      className={`
                        p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 card-shadow
                        ${buttonClass}
                        ${!hasAnswered && !isRevealed ? 'hover:scale-105 active:scale-95' : ''}
                        disabled:cursor-not-allowed relative
                      `}
                    >
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-current/10 flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
                          {letters[idx]}
                        </div>
                        <div className="text-left text-base md:text-lg font-medium flex-1">
                          {option.text}
                        </div>
                        {(hasAnswered || isRevealed) && isCorrect && (
                          <span className="text-white text-xl md:text-2xl flex-shrink-0">✓</span>
                        )}
                        {hasAnswered && isUserAnswer && !isCorrect && (
                          <span className="text-red-600 text-xl md:text-2xl flex-shrink-0">✗</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!hasAnswered && !isRevealed && (
                <div className="mt-6 md:mt-8 flex justify-center">
                  <button
                    onClick={revealAnswer}
                    className="flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-white text-teal border-2 border-teal hover:bg-teal hover:text-white transition-all card-shadow font-medium text-sm md:text-base"
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Reveal Answer</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 md:gap-4">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-white text-navy hover:bg-teal hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy text-xs md:text-base font-medium"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>Previous</span>
              </button>

              <div className="bg-white rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-3 card-shadow">
                <div className="text-xs md:text-sm text-teal font-medium">Score</div>
                <div className="text-base md:text-2xl font-bold text-navy">
                  {score.correct} / {score.total}
                </div>
              </div>

              <button
                onClick={goToNext}
                disabled={currentIndex === totalQuestions - 1 || (!hasAnswered && !isRevealed)}
                className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-white text-navy hover:bg-teal hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy text-xs md:text-base font-medium"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
