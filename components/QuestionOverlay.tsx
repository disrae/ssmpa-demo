'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/types';
import { CheckCircle, XCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface QuestionOverlayProps {
  question: Question;
  onAnswer: (answer: number | boolean | number[]) => void;
  onClose: () => void;
  onWatchAgain: () => void;
  feedback?: {
    isCorrect: boolean;
    message: string;
  } | null;
}

export function QuestionOverlay({ question, onAnswer, onClose, onWatchAgain, feedback }: QuestionOverlayProps) {
  const [currentOrder, setCurrentOrder] = useState<number[]>([]);

  // Initialize order when question changes
  useEffect(() => {
    if (question.type === 'order' && question.options) {
      // Create indices array [0, 1, 2...]
      const indices = question.options.map((_, i) => i);
      // Shuffle indices for the puzzle
      // Use setTimeout to move state update out of the render cycle
      const timeoutId = setTimeout(() => {
        const shuffled = [...indices].sort(() => Math.random() - 0.5);
        setCurrentOrder(shuffled);
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [question]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...currentOrder];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (swapIndex >= 0 && swapIndex < newOrder.length) {
      [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
      setCurrentOrder(newOrder);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let answer: number | boolean | number[] | undefined;

    if (question.type === 'multiple-choice') {
      answer = parseInt(formData.get('answer') as string);
    } else if (question.type === 'true-false') {
      const rawAnswer = formData.get('answer');
      answer = rawAnswer === 'true';
    } else if (question.type === 'order') {
      answer = currentOrder;
    }

    if (answer !== undefined) {
      console.log('Submitting answer:', answer);
      onAnswer(answer);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-2xl p-6 max-w-md w-full border border-border relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-foreground">Quick Check</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <p className="text-foreground mb-6">{question.question}</p>

        {feedback && feedback.isCorrect ? (
          // Show success feedback and continue button
          <div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-medium text-green-800">Correct!</span>
              </div>
              <div className="px-4 py-2 rounded mb-6 bg-green-50 border border-green-200">
                <p className="text-foreground">{feedback.message}</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          // Show question form (with error feedback if wrong answer was submitted)
          <>
            {feedback && !feedback.isCorrect && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <span className="font-medium text-red-800">Incorrect - Try Again</span>
                </div>
                <div className="px-4 py-2 rounded mb-6 bg-red-50 border border-red-200">
                <p className="text-foreground">{feedback.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="answer"
                        value={index}
                        className="text-blue-600"
                        required
                      />
                      <span className="text-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer"
                      value="true"
                      className="text-blue-600"
                      required
                    />
                    <span className="text-foreground">True</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer"
                      value="false"
                      className="text-blue-600"
                      required
                    />
                    <span className="text-foreground">False</span>
                  </label>
                </div>
              )}

              {question.type === 'order' && question.options && (
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-500 mb-2">Use arrows to reorder items:</p>
                  {currentOrder.map((optionIndex, displayIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center gap-3 bg-white p-3 
                       rounded border border-gray-200 shadow-sm 
                       animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => moveItem(displayIndex, 'up')}
                          disabled={displayIndex === 0}
                          className="p-1 border hover:bg-gray-100 rounded disabled:opacity-30 text-gray-700"
                        >
                          <ChevronUp className="w-6 h-6" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(displayIndex, 'down')}
                          disabled={displayIndex === question.options!.length - 1}
                          className="p-1 border hover:bg-gray-100 rounded disabled:opacity-30 text-gray-700"
                        >
                          <ChevronDown className="w-6 h-6" />
                        </button>
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-700">
                        {question.options![optionIndex]}
                      </span>
                      <div className="text-xs font-bold text-gray-400 w-6 text-center">
                        #{displayIndex + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col space-y-3">
                <button
                  type="submit"
                  className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Answer
                </button>
                <button
                  type="button"
                  onClick={onWatchAgain}
                  className="w-full px-4 py-2 text-foreground hover:text-foreground hover:bg-surface-secondary transition-colors border border-border rounded-md"
                >
                  Watch Again
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
