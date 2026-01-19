'use client';

import { curriculumModules } from '@/lib/questions';
import { ChevronLeft, ChevronDown, ChevronRight, Database } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function QuestionDataPage() {
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  const turkeyModule = curriculumModules.find(m => m.id === 'module-4'); // Turkey processing module
  const lessons = turkeyModule?.lessons || [];

  const toggleLesson = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple-choice': return 'Multiple Choice';
      case 'true-false': return 'True/False';
      case 'order': return 'Order';
      case '3d-point': return '3D Point';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="w-full bg-neutral-700 px-2 md:px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="bg-secondary hover:bg-secondary-600 text-foreground px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 transform hover:scale-102"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </Link>
              <div>
                <h1 className="text-lg md:text-2xl font-black text-gray-900">Question Data</h1>
                <p className="text-sm font-bold text-gray-900">Turkey Processing Module - {lessons.length} Videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="bg-surface border border-border rounded-lg overflow-hidden">
              {/* Lesson Header */}
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 text-left hover:bg-surface-secondary transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{lesson.title}</h3>
                    <p className="text-sm font-semibold text-gray-900">{lesson.questions.reduce((total, group) => total + group.questions.length, 0)} questions • {Math.floor(lesson.duration / 60)} min</p>
                  </div>
                </div>
                {expandedLessons.has(lesson.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-900" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                )}
              </button>

              {/* Questions */}
              {expandedLessons.has(lesson.id) && (
                <div className="border-t border-border">
                  <div className="p-6 space-y-4">
                    {lesson.questions.map((questionGroup, groupIndex) =>
                      questionGroup.questions.map((question, qIndex) => (
                        <div key={question.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 bg-primary/10 text-xs font-black rounded text-gray-900">
                                {getQuestionTypeLabel(question.type)}
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {formatTime(questionGroup.time)}{questionGroup.questions.length > 1 ? ` (${qIndex + 1}/${questionGroup.questions.length})` : ''}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-gray-900">#{groupIndex + 1}.{qIndex + 1}</span>
                          </div>

                        <div className="space-y-3">
                          <div className="font-bold text-gray-900">{question.question}</div>

                          {/* Options for multiple choice */}
                          {question.type === 'multiple-choice' && question.options && (
                            <div className="space-y-2 ml-4">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    optIndex === question.correctAnswer
                                      ? 'border-green-500 bg-green-500'
                                      : 'border-gray-300'
                                  }`}>
                                    {optIndex === question.correctAnswer && (
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                  </div>
                                  <span className={optIndex === question.correctAnswer ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}>
                                    {option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* True/False */}
                          {question.type === 'true-false' && (
                            <div className="space-y-2 ml-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  question.correctAnswer === true
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300'
                                }`}>
                                  {question.correctAnswer === true && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <span className={question.correctAnswer === true ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}>
                                  True
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  question.correctAnswer === false
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300'
                                }`}>
                                  {question.correctAnswer === false && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <span className={question.correctAnswer === false ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}>
                                  False
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Order questions */}
                          {question.type === 'order' && question.options && (
                            <div className="space-y-2 ml-4">
                              {(question.correctAnswer as number[]).map((originalIndex, position) => (
                                <div key={position} className="flex items-center gap-2">
                                  <span className="w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {position + 1}
                                  </span>
                                  <span className="font-semibold text-gray-900">{question.options![originalIndex]}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 3D Point questions */}
                          {question.type === '3d-point' && (
                            <div className="ml-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                              <div className="text-sm font-bold text-gray-900">
                                🎯 Interactive 3D targeting question
                                {question.targetZone && (
                                  <span className="ml-2 text-xs font-black text-gray-900">
                                    ({question.targetZone.zones.length} target zone{question.targetZone.zones.length !== 1 ? 's' : ''})
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Explanation */}
                          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="text-sm font-black mb-1 text-gray-900">
                              ✓ Correct Answer Explanation:
                            </div>
                            <div className="text-sm font-bold text-gray-900">{question.explanation}</div>
                          </div>

                          {/* Wrong answer hints */}
                          {question.wrongAnswerHints && (
                            <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                              <div className="text-sm font-black mb-1 text-gray-900">
                                💡 Wrong Answer Hint{Array.isArray(question.wrongAnswerHints) ? 's' : ''}:
                              </div>
                              <div className="text-sm font-bold text-gray-900">
                                {Array.isArray(question.wrongAnswerHints)
                                  ? question.wrongAnswerHints.filter(hint => hint).join(' • ')
                                  : question.wrongAnswerHints
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}