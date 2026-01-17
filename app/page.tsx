'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Question } from '@/lib/types';
import { getCurrentLesson, getLessonById, getTurkeyLessons, VideoLesson } from '@/lib/demo-data';
import { VideoPlayer } from '@/components/VideoPlayer';
import { QuestionOverlay } from '@/components/QuestionOverlay';
import { CurriculumSidebar } from '@/components/CurriculumSidebar';
import { List, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DemoPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentLesson, setCurrentLesson] = useState<VideoLesson>(getCurrentLesson());
  const lastProcessedSecond = useRef<number>(-1);
  const previousTime = useRef<number>(0);

  // Create questions indexed by second for efficient lookup
  const questionsBySecond = useMemo(() => {
    const questions: Record<number, Question> = {};
    currentLesson.questions.forEach(question => {
      questions[Math.floor(question.time)] = question;
    });
    return questions;
  }, [currentLesson]);

  // Lesson navigation functions
  const turkeyLessons = getTurkeyLessons();
  const currentLessonIndex = turkeyLessons.findIndex(lesson => lesson.id === currentLesson.id);

  const handleLessonSelect = (lessonId: string) => {
    console.log('handleLessonSelect called with:', lessonId);
    const selectedLesson = getLessonById(lessonId);
    console.log('selectedLesson:', selectedLesson);
    if (selectedLesson) {
      // Reset video state when switching lessons
      setCurrentTime(0);
      setIsPlaying(false);
      setHasStarted(false);
      setShowQuestion(false);
      setFeedback(null);
      setCurrentQuestion(null);
      setSeekTo(undefined);
      lastProcessedSecond.current = -1;
      previousTime.current = 0;
      setCurrentLesson(selectedLesson);
      setSidebarOpen(false); // Close sidebar after selection
    }
  };

  const handleNextLesson = () => {
    const nextIndex = currentLessonIndex + 1;
    if (nextIndex < turkeyLessons.length) {
      handleLessonSelect(turkeyLessons[nextIndex].id);
    }
  };

  const handlePreviousLesson = () => {
    const prevIndex = currentLessonIndex - 1;
    if (prevIndex >= 0) {
      handleLessonSelect(turkeyLessons[prevIndex].id);
    }
  };

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="w-full bg-neutral-700 px-2 md:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-foreground">SSMPA Training Material</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-secondary hover:bg-secondary-600 text-foreground px-2 md:px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 transform hover:scale-102"
            >
              <List className="w-6 h-6 text-white" />
              <span className="hidden md:inline md:font-semibold text-slate-50">Curriculum</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 px-0 md:px-6 pt-0 md:pt-8 pb-8 md:pb-0">
        <div className="flex-1">

          {/* Main Video Area */}
          <div className="flex-1 flex items-center justify-center -mt-px pt-2 md:p-4">
            <div className="w-full max-w-none md:max-w-4xl">

              {/* Lesson Info */}
              <div className="px-4 md:px-0 mb-4 md:mb-6">
                <p>Current Lesson</p>
                <p className="text-lg md:text-xl font-semibold text-foreground mb-2">{currentLesson.title}</p>
                {/* <p className="text-muted-foreground text-base leading-relaxed">{currentLesson.description}</p> */}
              </div>

              {/* Video Player */}
              <div className="relative">
                <VideoPlayer
                  key={currentLesson.id}
                  videoSrc={currentLesson.videoSrc}
                  onTimeUpdate={setCurrentTime}
                  isPlaying={isPlaying}
                  questionActive={showQuestion}
                  seekTo={seekTo}
                />

                {!hasStarted && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      onClick={handleStartLesson}
                      className="bg-accent-800 hover:bg-accent-900 text-foreground text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl transform transition-all hover:scale-102 flex items-center gap-2 md:gap-3 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                      </svg>
                      <p className="text-lg md:text-2xl font-bold text-slate-100">Start Lesson</p>
                    </button>
                  </div>
                )}
              </div>

              {/* Lesson Progress */}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center p-4 md:py-8">
                <button
                  onClick={handlePreviousLesson}
                  disabled={currentLessonIndex <= 0}
                  className="px-4 md:px-6 py-3 bg-secondary text-gray-200 font-semibold tracking-wide rounded-lg cursor-pointer hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-102"
                >
                  <ChevronLeft className="w-6 h-6" />
                  <span className="hidden md:inline">Previous Lesson</span>
                </button>
                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex >= turkeyLessons.length - 1}
                  className="px-4 md:px-6 py-3 bg-secondary text-gray-200 font-semibold tracking-wide rounded-lg cursor-pointer hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-102"
                >
                  <span className="hidden md:inline">Next Lesson</span>
                  <ChevronRight className="w-6 h-6" />
                </button>
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
        </div>

        {/* Curriculum Sidebar */}
        <CurriculumSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLessonSelect={handleLessonSelect}
        />
      </div>
    </div>
  );
}
