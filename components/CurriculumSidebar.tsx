'use client';

import { curriculumModules } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

interface CurriculumSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CurriculumSidebar({ isOpen, onClose }: CurriculumSidebarProps) {
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
        <div className="relative ml-auto w-80 max-w-[90vw] bg-white h-full overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Curriculum</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            SSMPA Slaughter Licensing Program
          </p>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {curriculumModules.map((module) => (
              <div key={module.id} className="border border-gray-200 rounded-lg">
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{module.icon}</span>
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>

                <div className="divide-y divide-gray-100">
                  {module.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={cn(
                        "p-3 hover:bg-gray-50 cursor-pointer transition-colors",
                        index === 0 && "bg-blue-50 border-l-4 border-blue-500" // Highlight first lesson
                      )}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {lesson.questions.length} question{lesson.questions.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Learning Objectives
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {module.learningObjectives.map((objective, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start space-x-1">
                        <span className="text-gray-400 mt-1">•</span>
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
