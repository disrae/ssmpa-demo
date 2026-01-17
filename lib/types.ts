// Re-export types from demo-data.ts for easier imports
export type { Module } from './demo-data';

export interface Question {
  id: string;
  time: number; // seconds into video
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'order';
  question: string;
  options?: string[]; // for multiple choice or items to order
  correctAnswer: number | boolean | string | string[];
  explanation: string; // feedback text for correct answers
  wrongAnswerHints?: string[] | string; // hints for wrong answers - array for multiple choice, string for others
}

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  videoSrc: string;
  questions: Question[];
}

// Additional UI-related types
export interface DemoState {
  currentLesson: VideoLesson;
  currentTime: number;
  isPlaying: boolean;
  showQuestion: boolean;
  currentQuestionIndex: number;
  answers: Record<string, any>;
  progress: Record<string, boolean>; // lessonId -> completed
  sidebarOpen: boolean;
}

export interface QuestionResponse {
  questionId: string;
  answer: any;
  isCorrect: boolean;
  timestamp: number;
}
