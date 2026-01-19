import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { puzzleQuestions } from './puzzleData';
import { PuzzleImage } from './PuzzleImage';
import { PieceOption } from './PieceOption';
import { SuccessOverlay } from '@/components/common/SuccessOverlay';
import { FailureOverlay } from '@/components/common/FailureOverlay';
import { useSound } from '@/hooks/useSound';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight } from 'lucide-react';

export const ShapePuzzleGame = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const { markGameCompleted, updateGameProgress } = useProgress();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const currentQuestion = puzzleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === puzzleQuestions.length - 1;

  const handlePieceSelect = useCallback((correct: boolean) => {
    if (correct) {
      setIsCorrect(true);
      setIsComplete(true);
      setShowSuccess(true);
    } else {
      setShowFailure(true);
    }
  }, []);

  const handleSuccessComplete = useCallback(() => {
    setShowSuccess(false);
  }, []);

  const handleFailureComplete = useCallback(() => {
    setShowFailure(false);
  }, []);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      markGameCompleted('shape-puzzle');
      setGameFinished(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsCorrect(false);
      setIsComplete(false);
    }
    playSound('click');
  }, [isLastQuestion, markGameCompleted, playSound]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handlePlayAgain = useCallback(() => {
    setCurrentQuestionIndex(0);
    setIsCorrect(false);
    setIsComplete(false);
    setGameFinished(false);
    playSound('click');
  }, [playSound]);

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--pastel-pink))] to-[hsl(var(--pastel-yellow))] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="text-6xl md:text-8xl">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            おめでとう！
          </h2>
          <p className="text-lg text-foreground/80">
            ぜんぶできたね！
          </p>
          
          <div className="flex flex-col gap-3 mt-8">
            <Button
              onClick={handlePlayAgain}
              size="lg"
              className="text-lg px-8"
            >
              もういっかい
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              size="lg"
              className="text-lg px-8"
            >
              <Home className="w-5 h-5 mr-2" />
              ホームへ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--pastel-pink))] to-[hsl(var(--pastel-blue)/0.3)] flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoHome}
          className="rounded-full bg-white/50"
        >
          <Home className="w-5 h-5" />
        </Button>
        
        <div className="flex gap-2">
          {puzzleQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentQuestionIndex
                  ? 'bg-primary'
                  : index === currentQuestionIndex
                  ? 'bg-primary/50'
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        <div className="w-10" />
      </header>

      {/* Question */}
      <div className="text-center py-4 px-4">
        <p className="text-xl md:text-2xl font-bold text-foreground">
          {currentQuestion.description}
        </p>
      </div>

      {/* Game Area */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 p-4">
        {/* Puzzle Image */}
        <div className="flex-1 flex items-center justify-center">
          <PuzzleImage
            missingPartEmoji={currentQuestion.missingPartEmoji}
            isComplete={isComplete}
          />
        </div>

        {/* Options */}
        <div className="w-full md:w-auto flex md:flex-col gap-4 justify-center max-w-xs">
          {currentQuestion.options.map((option) => (
            <div key={option.id} className="w-32 md:w-36">
              <PieceOption
                emoji={option.emoji}
                name={option.name}
                color={option.color}
                isCorrect={option.isCorrect}
                disabled={isCorrect}
                onSelect={handlePieceSelect}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Next Button */}
      {isCorrect && (
        <div className="p-6 flex justify-center">
          <Button
            onClick={handleNext}
            size="lg"
            className="text-xl px-12 py-6 rounded-full animate-bounce-pop"
          >
            {isLastQuestion ? 'おわり' : 'つぎへ'}
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      )}

      {/* Overlays */}
      <SuccessOverlay show={showSuccess} onComplete={handleSuccessComplete} />
      <FailureOverlay show={showFailure} onComplete={handleFailureComplete} />
    </div>
  );
};
