import { ChevronLeft, ChevronRight, X, RotateCcw, Trophy, Eye } from 'lucide-react';
import { useQuiz } from '../hooks/use-quiz';
import type { HSKLevel } from '../interfaces/HSKLevel';

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

          <div className="text-sm md:text-lg font-medium text-navy">
            HSK Level {level}
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
                <div className="text-5xl md:text-7xl font-bold text-navy">
                  {currentQuestion.character}
                </div>
                <div className="text-xl md:text-3xl text-teal font-medium">
                  {currentQuestion.pinyin}
                </div>
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
                      onClick={() => submitAnswer(option.text)}
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

            <div className="flex items-center justify-between">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="p-2 md:p-4 rounded-lg md:rounded-xl bg-white text-navy hover:bg-teal hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <div className="bg-white rounded-lg md:rounded-xl px-4 md:px-6 py-2 md:py-3 card-shadow">
                <div className="text-xs md:text-sm text-teal font-medium">Score</div>
                <div className="text-lg md:text-2xl font-bold text-navy">
                  {score.correct} / {score.total}
                </div>
              </div>

              <button
                onClick={goToNext}
                disabled={currentIndex === totalQuestions - 1 || (!hasAnswered && !isRevealed)}
                className="p-2 md:p-4 rounded-lg md:rounded-xl bg-white text-navy hover:bg-teal hover:text-white transition-all card-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
