'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Question } from '@/lib/types';
import { getCurrentLesson } from '@/lib/demo-data';
import { VideoPlayer } from '@/components/VideoPlayer';
import { QuestionOverlay } from '@/components/QuestionOverlay';
import { CurriculumSidebar } from '@/components/CurriculumSidebar';

export default function DemoPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState<{isCorrect: boolean; message: string} | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const lastProcessedSecond = useRef<number>(-1);
  const previousTime = useRef<number>(0);

  const currentLesson = getCurrentLesson();

  // Create questions indexed by second for efficient lookup
  const questionsBySecond = useMemo(() => {
    const questions: Record<number, Question> = {};
    currentLesson.questions.forEach(question => {
      questions[Math.floor(question.time)] = question;
    });
    return questions;
  }, [currentLesson]);

  // Check for questions at each second
  useEffect(() => {
    const currentSecond = Math.floor(currentTime);

    // Only process if we haven't already processed this second and not seeking backwards
    if (currentSecond !== lastProcessedSecond.current && currentTime >= previousTime.current) {
      lastProcessedSecond.current = currentSecond;

      const questionAtSecond = questionsBySecond[currentSecond];

      if (questionAtSecond && !showQuestion) {
        // eslint-disable-next-line
        setCurrentQuestion(questionAtSecond);
        setIsPlaying(false);
        setShowQuestion(true);
      }
    }

    // Update previous time for next comparison
    previousTime.current = currentTime;
  }, [currentTime, questionsBySecond, showQuestion]);

  // Clear seekTo after it's been used
  useEffect(() => {
    if (seekTo !== undefined) {
      // Clear it after a short delay to ensure the seek happens
      const timeout = setTimeout(() => setSeekTo(undefined), 100);
      return () => clearTimeout(timeout);
    }
  }, [seekTo]);

  const handleAnswer = (answer: number | boolean | string) => {
    if (!currentQuestion) return;

    // Validate the answer
    let isCorrect = false;

    if (currentQuestion!.type === 'multiple-choice') {
      isCorrect = answer === currentQuestion!.correctAnswer;
    } else if (currentQuestion!.type === 'true-false') {
      console.log('Answer:', answer, 'Correct:', currentQuestion!.correctAnswer);
      isCorrect = answer === currentQuestion!.correctAnswer;
    } else if (currentQuestion!.type === 'short-answer') {
      isCorrect = typeof answer === 'string' && typeof currentQuestion!.correctAnswer === 'string'
        ? answer.toLowerCase().trim() === currentQuestion!.correctAnswer.toLowerCase().trim()
        : false;
    }

    // Determine feedback message: use hint for wrong answers, explanation for correct
    let message = '';
    if (isCorrect) {
      message = currentQuestion!.explanation;
    } else {
      // Use hint for wrong answers
      if (currentQuestion!.type === 'multiple-choice' && Array.isArray(currentQuestion!.wrongAnswerHints)) {
        const hintIndex = typeof answer === 'number' ? answer : 0;
        message = currentQuestion!.wrongAnswerHints[hintIndex] || 'Think about this more carefully.';
      } else if (typeof currentQuestion!.wrongAnswerHints === 'string') {
        message = currentQuestion!.wrongAnswerHints;
      } else {
        message = 'Think about this more carefully.';
      }
    }

    // Set feedback to show in modal (don't close modal yet)
    setFeedback({
      isCorrect,
      message
    });
  };

  const handleContinue = () => {
    // Clear feedback and close modal
    setFeedback(null);
    setShowQuestion(false);

    // Resume playing
    setIsPlaying(true);
  };

  const handleWatchAgain = () => {
    const seekTarget = Math.max(0, currentTime - 4);
    setSeekTo(seekTarget);
    setFeedback(null);
    setShowQuestion(false);
    setIsPlaying(true);
  };


  const handleStartLesson = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Curriculum Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
      >
        Open Curriculum
      </button>

      {/* Main Video Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl relative">
          <VideoPlayer
            videoSrc={currentLesson.videoSrc}
            onTimeUpdate={setCurrentTime}
            isPlaying={isPlaying}
            questionActive={showQuestion}
            seekTo={seekTo}
          />

          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center  z-10">
              <button
                onClick={handleStartLesson}
                className="bg-blue-900 hover:bg-blue-800 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl transform transition hover:scale-105 flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                </svg>
                Start Lesson
              </button>
            </div>
          )}

          {/* Lesson Info */}
          <div className="mt-4 text-white">
            <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
            <p className="text-gray-300">{currentLesson.description}</p>
          </div>
        </div>
      </div>

      {/* Question Overlay */}
      {showQuestion && currentQuestion && (
        <QuestionOverlay
          question={currentQuestion}
          onAnswer={handleAnswer}
          onClose={handleContinue}
          onWatchAgain={handleWatchAgain}
          feedback={feedback}
        />
      )}

      {/* Curriculum Sidebar */}
      <CurriculumSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
