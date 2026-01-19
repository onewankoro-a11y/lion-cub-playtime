import { useState, useEffect } from 'react';
import { useParentalControl } from '@/hooks/useParentalControl';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ParentalGateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const ParentalGate = ({ open, onOpenChange, onSuccess }: ParentalGateProps) => {
  const { generateMathProblem, verifyAnswer } = useParentalControl();
  const [problem, setProblem] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (open) {
      setProblem(generateMathProblem());
      setUserAnswer('');
      setError(false);
    }
  }, [open, generateMathProblem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(userAnswer, 10);
    
    if (verifyAnswer(answer, problem.answer)) {
      onSuccess();
      onOpenChange(false);
    } else {
      setError(true);
      setProblem(generateMathProblem());
      setUserAnswer('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            ほごしゃかくにん
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-4">
          <p className="text-muted-foreground mb-6">
            おとなのひとにといてもらってね
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-4xl font-bold text-primary">
              {problem.question}
            </div>
            
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="こたえをいれてね"
              className="text-center text-2xl h-14"
              autoFocus
            />
            
            {error && (
              <p className="text-destructive text-sm">
                ちがうよ、もういちど！
              </p>
            )}
            
            <Button type="submit" className="w-full" size="lg">
              かくにん
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
