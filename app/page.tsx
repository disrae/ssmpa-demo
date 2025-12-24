'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Question } from '@/lib/types';
import { getCurrentLesson } from '@/lib/demo-data';
import { VideoPlayer } from '@/components/VideoPlayer';
import { QuestionOverlay } from '@/components/QuestionOverlay';
import { CurriculumSidebar } from '@/components/CurriculumSidebar';

export default function DemoPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState<{isCorrect: boolean; message: string} | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [lastPausePoint, setLastPausePoint] = useState(0);
  const lastProcessedSecond = useRef<number>(-1);

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

    // Only process if we haven't already processed this second
    if (currentSecond !== lastProcessedSecond.current) {
      lastProcessedSecond.current = currentSecond;

      const questionAtSecond = questionsBySecond[currentSecond];

      if (questionAtSecond && !showQuestion) {
        // eslint-disable-next-line
        setCurrentQuestion(questionAtSecond);
        setIsPlaying(false);
        setShowQuestion(true);
      }
    }
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

    // Set feedback to show in modal (don't close modal yet)
    setFeedback({
      isCorrect,
      message: currentQuestion!.explanation
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
        <div className="w-full max-w-4xl">
        <VideoPlayer
          videoSrc={currentLesson.videoSrc}
          onTimeUpdate={setCurrentTime}
          isPlaying={isPlaying}
          questionActive={showQuestion}
          seekTo={seekTo}
        />

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
