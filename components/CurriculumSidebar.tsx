'use client';

import { curriculumModules, VideoLesson } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

interface CurriculumSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonSelect: (lessonId: string) => void;
}

export function CurriculumSidebar({ isOpen, onClose, onLessonSelect }: CurriculumSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-0 z-50 flex">
        <div className="relative ml-auto w-80 max-w-[90vw] bg-surface h-full overflow-y-auto">
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Curriculum</h2>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded font-bold text-muted-foreground hover:text-foreground cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            SSMPA Training Material
          </p>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {curriculumModules.map((module) => (
              <div
                key={module.id}
                className={cn(
                  "border rounded-lg transition-all duration-200",
                  module.implemented
                    ? "border-border"
                    : "border-border-secondary bg-surface-secondary opacity-60"
                )}
              >
                <div
                  className={cn(
                    "p-3 border-b",
                    module.implemented
                      ? "bg-surface border-border"
                      : "bg-surface-secondary border-border-secondary"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={cn(
                        "text-lg font-bold",
                        module.implemented ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {module.icon}
                    </span>
                    <h3
                      className={cn(
                        "font-semibold",
                        module.implemented ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {module.title}
                    </h3>
                    {!module.implemented && (
                      <span className="text-xs bg-muted text-foreground px-2 py-1 rounded-full font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-sm mt-1",
                      module.implemented ? "text-muted-foreground" : "text-muted"
                    )}
                  >
                    {module.description}
                  </p>
                </div>

                <div
                  className={cn(
                    "divide-y",
                    module.implemented ? "divide-border" : "divide-border-secondary"
                  )}
                >
                  {module.lessons.map((lesson: VideoLesson, index) => (
                    <div
                      key={lesson.id}
                      className={cn(
                        "p-3 transition-colors",
                        module.implemented
                          ? "hover:bg-surface-secondary cursor-pointer"
                          : "cursor-not-allowed",
                        index === 0 && module.implemented && "bg-primary/10 border-l-4 border-primary" // Only highlight first lesson if implemented
                      )}
                      onClick={() => {
                        console.log('CurriculumSidebar onClick:', lesson.id, 'implemented:', module.implemented);
                        if (module.implemented) {
                          onLessonSelect(lesson.id);
                        }
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mt-2 shrink-0",
                            module.implemented ? "bg-muted" : "bg-muted-foreground"
                          )}
                        />
                        <div className="flex-1">
                          <h4
                            className={cn(
                              "font-medium text-sm",
                              module.implemented ? "text-foreground" : "text-muted-foreground"
                            )}
                          >
                            {lesson.title}
                          </h4>
                          <p
                            className={cn(
                              "text-xs mt-1",
                              module.implemented ? "text-muted-foreground" : "text-muted"
                            )}
                          >
                            {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                          </p>
                          <p
                            className={cn(
                              "text-xs mt-1",
                              module.implemented ? "text-gray-600" : "text-gray-400"
                            )}
                          >
                            {lesson.questions.length} question{lesson.questions.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "p-3 border-t",
                    module.implemented
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gray-100 border-gray-300"
                  )}
                >
                  <h4
                    className={cn(
                      "text-xs font-medium uppercase tracking-wide",
                      module.implemented ? "text-gray-700" : "text-gray-500"
                    )}
                  >
                    Learning Objectives
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {module.learningObjectives.map((objective, index) => (
                      <li
                        key={index}
                        className={cn(
                          "text-xs flex items-start space-x-1",
                          module.implemented ? "text-gray-600" : "text-gray-400"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1",
                            module.implemented ? "text-gray-400" : "text-gray-300"
                          )}
                        >
                          •
                        </span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
