// Re-export types from demo-data.ts for easier imports
export type { Module } from './demo-data';

export interface Question {
  id: string;
  time: number; // seconds into video
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: number | boolean | string;
  explanation: string; // feedback text
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
