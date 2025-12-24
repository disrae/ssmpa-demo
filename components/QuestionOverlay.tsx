'use client';

import { Question } from '@/lib/types';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionOverlayProps {
  question: Question;
  onAnswer: (answer: number | boolean | string) => void;
  onClose: () => void;
  onWatchAgain: () => void;
  feedback?: {
    isCorrect: boolean;
    message: string;
  } | null;
}

export function QuestionOverlay({ question, onAnswer, onClose, onWatchAgain, feedback }: QuestionOverlayProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let answer: number | boolean | string | undefined;

    if (question.type === 'multiple-choice') {
      answer = parseInt(formData.get('answer') as string);
    } else if (question.type === 'true-false') {
      const rawAnswer = formData.get('answer');
      console.log('Raw answer:', rawAnswer);
      answer = rawAnswer === 'true';
      console.log('Processed answer:', answer);
    } else if (question.type === 'short-answer') {
      answer = formData.get('answer') as string;
    }

    if (answer !== undefined) {
      console.log('Submitting answer:', answer);
      onAnswer(answer);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200 relative">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Quick Check</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-700 mb-6">{question.question}</p>

        {feedback && feedback.isCorrect ? (
          // Show success feedback and continue button
          <div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-medium text-green-800">Correct!</span>
              </div>
              <div className="px-4 py-2 rounded mb-6 bg-green-50 border border-green-200">
                <p className="text-gray-700">{feedback.message}</p>
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
                <p className="text-gray-700">{feedback.message}</p>
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
                      <span className="text-gray-700">{option}</span>
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
                    <span className="text-gray-700">True</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer"
                      value="false"
                      className="text-blue-600"
                      required
                    />
                    <span className="text-gray-700">False</span>
                  </label>
                </div>
              )}

              {question.type === 'short-answer' && (
                <input
                  type="text"
                  name="answer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your answer..."
                  required
                />
              )}

              <div className="mt-6 flex flex-col space-y-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Answer
                </button>
                <button
                  type="button"
                  onClick={onWatchAgain}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors border border-gray-200 rounded-md"
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
