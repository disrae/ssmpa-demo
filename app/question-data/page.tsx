'use client';

import { curriculumModules, Question } from '@/lib/questions';
import { ChevronLeft, ChevronDown, ChevronRight, Play } from 'lucide-react';
import { parseTimeToSeconds } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { QuestionOverlay } from '@/components/QuestionOverlay';

export default function QuestionDataPage() {
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [expandedQuestionGroups, setExpandedQuestionGroups] = useState<Set<string>>(new Set());
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [questionFeedback, setQuestionFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

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

  const toggleQuestionGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedQuestionGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedQuestionGroups(newExpanded);
  };

  const handleTryQuestion = (question: Question) => {
    setActiveQuestion(question);
    setQuestionFeedback(null);
  };

  const handleQuestionAnswer = (answer: number | boolean | number[]) => {
    if (!activeQuestion) return;

    let isCorrect = false;
    let message = '';

    if (activeQuestion.type === 'multiple-choice' || activeQuestion.type === 'true-false') {
      isCorrect = answer === activeQuestion.correctAnswer;
      if (isCorrect) {
        message = activeQuestion.explanation;
      } else {
        message = Array.isArray(activeQuestion.wrongAnswerHints)
          ? activeQuestion.wrongAnswerHints[answer as number] || 'Try again!'
          : activeQuestion.wrongAnswerHints || 'Try again!';
      }
    } else if (activeQuestion.type === 'order') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeQuestion.correctAnswer);
      message = isCorrect ? activeQuestion.explanation : 'Incorrect order. Try again!';
    } else if (activeQuestion.type === '3d-point') {
      isCorrect = answer === activeQuestion.correctAnswer;
      if (isCorrect) {
        message = activeQuestion.explanation;
      } else {
        message = Array.isArray(activeQuestion.wrongAnswerHints)
          ? activeQuestion.wrongAnswerHints[0] || 'Try again!'
          : activeQuestion.wrongAnswerHints || 'Try again!';
      }
    }

    setQuestionFeedback({ isCorrect, message });
  };

  const handleCloseOverlay = () => {
    setActiveQuestion(null);
    setQuestionFeedback(null);
  };

  const handleWatchAgain = () => {
    // For the question data page, we don't have a video to rewind
    // This could be enhanced later to scroll to the relevant question group
    console.log('Watch again clicked - no video available in question data view');
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

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice': return 'bg-blue-100 text-blue-800';
      case 'true-false': return 'bg-green-100 text-green-800';
      case 'order': return 'bg-purple-100 text-purple-800';
      case '3d-point': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypes = (questions: Question[]) => {
    const types = [...new Set(questions.map(q => q.type))];
    return (
      <div className="flex flex-wrap gap-1">
        {types.map(type => (
          <span
            key={type}
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getQuestionTypeColor(type)}`}
          >
            {getQuestionTypeLabel(type)}
          </span>
        ))}
      </div>
    );
  };

  const getQuestionGroupTitle = (lessonId: string, time: string) => {
    // Handling & Transport
    if (lessonId === 'turkey-handling') {
      switch (time) {
        case '0:36': return 'Calm Handling';
        case '1:00': return 'Herding Techniques';
        case '1:23': return 'Trailer Preparation';
        case '1:59': return 'Wing Control';
        case '2:22': return 'Safe Processing Practices';
        default: return 'Handling';
      }
    }

    // Stunning & Sticking
    if (lessonId === 'turkey-stunning') {
      switch (time) {
        case '0:20': return 'Stunning Certification';
        case '1:19': return 'Sticking Knife';
        case '1:40': return 'Stun Location';
        case '2:07': return 'Transverse Cutting';
        case '2:23': return 'Sticking Procedure';
        case '2:30': return 'Bleeding Completion';
        default: return 'Stunning & Sticking';
      }
    }

    // Scalding & Plucking
    if (lessonId === 'turkey-scalding') {
      switch (time) {
        case '0:54': return 'Pre-Plucking Preparation';
        case '1:15': return 'Scalder Monitoring';
        default: return 'Scalding';
      }
    }

    // Evisceration
    if (lessonId === 'turkey-evisceration') {
      switch (time) {
        case '0:53': return 'Crop Location';
        case '2:02': return 'Gallbladder Removal';
        case '2:38': return 'Organ Removal';
        case '2:46': return 'Trachea Removal';
        default: return 'Evisceration';
      }
    }

    return 'General Topic';
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

      {/* Info Section */}
      <div className="w-full bg-background px-4 md:px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">Question Data Structure</h2>
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <p>
                  <strong>Lessons:</strong> Each collapsible section represents a complete video lesson with its associated questions.
                </p>
              </div>
              <div>
                <p>
                  <strong>Question Sets:</strong> Within each lesson, questions are grouped by timestamp and topic. Each set focuses on a specific learning objective or procedure.
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  💡 You can add an arbitrary number of questions to any timestamp - they will appear one afer the other.
                </p>
              </div>
              <div>
                <p>
                  <strong>Individual Questions:</strong> Each question is numbered and includes the question type, content, answer options (where applicable), and detailed explanations.
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Question Types:</strong> Multiple Choice, Order, and 3D Point (interactive targeting questions).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="bg-surface  rounded-lg overflow-hidden">
              {/* Lesson Header */}
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 text-left hover:bg-surface-secondary transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{lesson.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      {getQuestionTypes(lesson.questions.flatMap(group => group.questions))}
                    </div>
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
                  <div className="p-6 space-y-6">
                    {lesson.questions.map((questionGroup, groupIndex) => {
                      const groupKey = `${lesson.id}-${groupIndex}`;
                      const isExpanded = expandedQuestionGroups.has(groupKey);

                      return (
                        <div key={groupIndex} className="border border-border rounded-lg overflow-hidden">
                          {/* Question Group Header - Clickable */}
                          <button
                            onClick={() => toggleQuestionGroup(groupKey)}
                            className="w-full p-4 text-left hover:bg-surface-secondary transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 border border-gray-300 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">
                                {groupIndex + 1}
                              </div>
                              <div>
                                <h5 className="text-base font-bold text-gray-900">
                                  {getQuestionGroupTitle(lesson.id, String(questionGroup.time))}
                                </h5>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-sm font-semibold text-gray-700">
                                    {formatTime(parseTimeToSeconds(questionGroup.time))} - {questionGroup.questions.length} question{questionGroup.questions.length !== 1 ? 's' : ''}
                                  </p>
                                  <span className="text-gray-600">-</span>
                                  {getQuestionTypes(questionGroup.questions)}
                                </div>
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-900" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-900" />
                            )}
                          </button>

                          {/* Questions List */}
                          {isExpanded && (
                            <div className="border-t border-border">
                              <div className="p-4 space-y-4">
                          {questionGroup.questions.map((question, qIndex) => (
                            <div key={question.id} className={`border border-border rounded-lg p-4 ${qIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="px-2 py-1 bg-primary/10 text-xs font-black rounded text-gray-900">
                                    {getQuestionTypeLabel(question.type)}
                                  </span>
                                </div>
                                <span className="text-sm font-black text-gray-900">#{groupIndex + 1}.{qIndex + 1}</span>
                              </div>

                              <div className="space-y-3">
                                <div className="font-black text-gray-900 text-lg">{question.question}</div>

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

                          {/* Try Question Button */}
                          <div className="mt-4 flex justify-center">
                            <button
                              onClick={() => handleTryQuestion(question)}
                              className="flex items-center gap-2 bg-accent-800 hover:bg-accent-900 text-white px-4 py-2 rounded-lg transition-all cursor-pointer transform hover:scale-105 font-medium"
                            >
                              <Play className="w-4 h-4" />
                              Try Question
                            </button>
                          </div>
                              </div>
                            </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question Overlay */}
      {activeQuestion && (
        <QuestionOverlay
          question={activeQuestion}
          onAnswer={handleQuestionAnswer}
          onClose={handleCloseOverlay}
          onWatchAgain={handleWatchAgain}
          feedback={questionFeedback}
        />
      )}
    </div>
  );
}