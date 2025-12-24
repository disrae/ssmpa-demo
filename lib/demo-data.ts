export interface Question {
  id: string;
  time: number; // seconds into video
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: number | boolean | string;
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

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: VideoLesson[];
  learningObjectives: string[];
}

export const curriculumModules: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to Slaughter Licensing & Safety',
    description: 'Understanding BC Meat Inspection Program requirements and personal responsibilities',
    icon: '📺',
    learningObjectives: [
      'Understand provincial licensing structure',
      'Identify personal legal responsibilities',
      'Recognize basic food safety hazards'
    ],
    lessons: [
      {
        id: 'module1-intro',
        title: 'Welcome & Overview',
        description: 'Introduction to the SSMPA slaughter licensing program',
        duration: 180, // 3:00
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder video
        questions: [
          {
            id: 'q1-1',
            time: 5,
            type: 'multiple-choice',
            question: 'What is the primary purpose of Class D licensing?',
            options: [
              'Commercial meat processing operations',
              'Farmgate direct sales to consumers',
              'Restaurant and retail operations',
              'Export certification requirements'
            ],
            correctAnswer: 1,
            explanation: 'Class D licenses allow farmers to sell meat directly to consumers at farmgate, supporting local food systems.',
            wrongAnswerHints: [
              'Think about the scale and direct-to-consumer nature of Class D operations.',
              '', // Correct answer gets no hint
              'Consider who benefits most from Class D licensing - is it food service businesses?',
              'Class D is about local sales, not international trade requirements.'
            ]
          },
          {
            id: 'q1-2',
            time: 10,
            type: 'true-false',
            question: 'Personal responsibility for food safety begins at the farm level.',
            correctAnswer: true,
            explanation: 'Every person involved in meat production shares responsibility for food safety from farm to table.',
            wrongAnswerHints: 'Consider where meat production begins - does food safety responsibility start later in the process?'
          },
          {
            id: 'q1-3',
            time: 15,
            type: 'multiple-choice',
            question: 'Which of the following is NOT a Class D licensing requirement?',
            options: [
              'Facility inspection and approval',
              'Personal training and certification',
              'Large-scale commercial processing capacity',
              'Compliance with food safety standards'
            ],
            correctAnswer: 2,
            explanation: 'Class D licenses are for small-scale farmgate operations, not large commercial processing facilities.',
            wrongAnswerHints: [
              'Facility inspection is indeed required for Class D licensing.',
              'Personal training and certification are essential requirements.',
              '', // Correct answer gets no hint
              'Food safety compliance is mandatory for all meat processing operations.'
            ]
          },
          {
            id: 'q1-4',
            time: 20,
            type: 'true-false',
            question: 'Farmers must maintain detailed records of all slaughter activities.',
            correctAnswer: true,
            explanation: 'Record-keeping is essential for regulatory compliance and food safety traceability.',
            wrongAnswerHints: 'Think about regulatory requirements - what documentation is typically needed for compliance?'
          },
          {
            id: 'q1-5',
            time: 25,
            type: 'multiple-choice',
            question: 'What is the maximum number of animals that can be slaughtered under a Class D license?',
            options: [
              '50 animals per year',
              '200 animals per year',
              '500 animals per year',
              'No annual limit'
            ],
            correctAnswer: 3,
            explanation: 'Class D licenses have no annual limit on animal numbers, though practical capacity varies by operation.',
            wrongAnswerHints: [
              'Consider that Class D operations can be quite small - is 50 the right limit?',
              'Think about larger farm operations - might they need more capacity?',
              'Small commercial operations might have this limit, but what about Class D?',
              '' // Correct answer gets no hint
            ]
          }
        ]
      },
      {
        id: 'module1-regulatory',
        title: 'Regulatory Framework',
        description: 'BC Meat Inspection Program overview and requirements',
        duration: 330, // 5:30
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder video
        questions: [
          {
            id: 'q2-1',
            time: 45,
            type: 'multiple-choice',
            question: 'Which government body oversees meat inspection in BC?',
            options: [
              'BC Ministry of Agriculture',
              'Canadian Food Inspection Agency (CFIA)',
              'BC Meat Inspection Program',
              'Health Canada'
            ],
            correctAnswer: 2,
            explanation: 'The BC Meat Inspection Program, administered by the Ministry of Agriculture, regulates slaughter facilities in British Columbia.',
            wrongAnswerHints: [
              'The Ministry of Agriculture oversees many agricultural programs, but is meat inspection their direct responsibility?',
              'CFIA handles federal meat inspection, but what about provincial programs?',
              '', // Correct answer gets no hint
              'Health Canada focuses on public health, but meat inspection involves more specific regulatory oversight.'
            ]
          }
        ]
      },
      {
        id: 'module1-responsibilities',
        title: 'Personal Responsibilities',
        description: 'Legal obligations and ethical considerations',
        duration: 255, // 4:15
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: [
          {
            id: 'q3-1',
            time: 60,
            type: 'true-false',
            question: 'Slaughter facility operators are legally responsible for animal welfare during the slaughter process.',
            correctAnswer: true,
            explanation: 'Facility operators must ensure humane treatment and proper stunning procedures are followed at all times.',
            wrongAnswerHints: 'Consider the legal obligations of facility operators - who is responsible for ensuring animal welfare?'
          }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Facility Design & Equipment',
    description: 'Slaughter area requirements, equipment specifications, and sanitation protocols',
    icon: '🏭',
    learningObjectives: [
      'Design compliant slaughter facilities',
      'Select appropriate equipment for species',
      'Implement proper sanitation protocols'
    ],
    lessons: [
      {
        id: 'module2-requirements',
        title: 'Slaughter Area Requirements',
        description: 'Layout and infrastructure standards',
        duration: 360, // 6:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: [
          {
            id: 'q4-1',
            time: 75,
            type: 'multiple-choice',
            question: 'What is the minimum distance required between livestock holding and slaughter areas?',
            options: [
              'No minimum distance required',
              '5 meters',
              '10 meters',
              '25 meters'
            ],
            correctAnswer: 1,
            explanation: 'A minimum 5-meter separation helps prevent cross-contamination and reduces animal stress.',
            wrongAnswerHints: [
              'There are indeed minimum distance requirements for biosecurity and welfare reasons.',
              '', // Correct answer gets no hint
              '5 meters is the standard minimum - is 10 meters excessive?',
              '25 meters would create significant space challenges for most facilities.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Pre-Slaughter Management',
    description: 'Animal welfare codes, transport requirements, and ante-mortem inspection',
    icon: '🐄',
    learningObjectives: [
      'Assess animal welfare and fitness for slaughter',
      'Implement low-stress handling methods',
      'Conduct proper ante-mortem inspections'
    ],
    lessons: [
      {
        id: 'module3-welfare',
        title: 'Animal Welfare Codes',
        description: 'Canadian Codes of Practice for animal welfare',
        duration: 270, // 4:30
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: [
          {
            id: 'q5-1',
            time: 40,
            type: 'true-false',
            question: 'Animals showing signs of severe illness should not be slaughtered.',
            correctAnswer: true,
            explanation: 'Severely ill animals must be euthanized, not slaughtered, to prevent food safety risks and animal suffering.',
            wrongAnswerHints: 'Think about food safety and animal welfare - what should happen to severely ill animals?'
          }
        ]
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Humane Slaughter Methods',
    description: 'Stunning methods, stun-to-stick intervals, and insensibility confirmation',
    icon: '⚡',
    learningObjectives: [
      'Select appropriate stunning methods for each species',
      'Execute proper stunning procedures',
      'Confirm and monitor insensibility'
    ],
    lessons: [
      {
        id: 'module4-stunning',
        title: 'Stunning Methods',
        description: 'Captive bolt, gunshot, and electrical stunning techniques',
        duration: 480, // 8:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: [
          {
            id: 'q6-1',
            time: 55,
            type: 'multiple-choice',
            question: 'What is the maximum time allowed between stunning and sticking for cattle?',
            options: [
              '15 seconds',
              '30 seconds',
              '60 seconds',
              '90 seconds'
            ],
            correctAnswer: 1,
            explanation: 'The stun-to-stick interval should not exceed 30 seconds to ensure the animal remains insensible.',
            wrongAnswerHints: [
              '15 seconds is too short and may not allow proper positioning.',
              '', // Correct answer gets no hint
              '60 seconds is too long - the animal may regain consciousness.',
              '90 seconds definitely exceeds the maximum allowable time.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Bleeding & Carcass Processing',
    description: 'Bleeding techniques, carcass splitting, and contamination prevention',
    icon: '🔪',
    learningObjectives: [
      'Execute proper bleeding procedures',
      'Perform carcass splitting and trimming',
      'Prevent microbial contamination'
    ],
    lessons: [
      {
        id: 'module5-bleeding',
        title: 'Bleeding Techniques',
        description: 'Species-specific bleeding methods and procedures',
        duration: 390, // 6:30
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: [
          {
            id: 'q7-1',
            time: 50,
            type: 'multiple-choice',
            question: 'What is the correct order for bleeding poultry?',
            options: [
              'Head first, then body',
              'Body first, then head',
              'Either direction is acceptable',
              'Depends on the species'
            ],
            correctAnswer: 0,
            explanation: 'Poultry should be bled head-first to ensure proper blood drainage and prevent contamination.',
            wrongAnswerHints: [
              '', // Correct answer gets no hint
              'Consider contamination risks - which direction prevents blood from pooling in edible parts?',
              'There are specific requirements for proper bleeding technique.',
              'While species matter for many procedures, bleeding order is standardized for poultry.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Food Safety & HACCP',
    description: 'HACCP principles, temperature control, and regulatory documentation',
    icon: '🧊',
    learningObjectives: [
      'Implement HACCP-based food safety plans',
      'Maintain proper temperature controls',
      'Complete required documentation'
    ],
    lessons: [
      {
        id: 'module6-haccp',
        title: 'HACCP Principles',
        description: 'Hazard Analysis Critical Control Points implementation',
        duration: 480, // 8:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: [
          {
            id: 'q8-1',
            time: 65,
            type: 'true-false',
            question: 'HACCP plans must identify potential biological, chemical, and physical hazards.',
            correctAnswer: true,
            explanation: 'HACCP requires identification of all three types of hazards: biological (pathogens), chemical (residues), and physical (foreign objects).',
            wrongAnswerHints: 'HACCP is comprehensive - what types of hazards must be considered in food safety planning?'
          }
        ]
      }
    ]
  }
];

// Helper function to get current lesson (for demo, start with first lesson)
export const getCurrentLesson = (): VideoLesson => {
  return curriculumModules[0].lessons[0];
};

// Helper function to get all lessons for navigation
export const getAllLessons = (): VideoLesson[] => {
  return curriculumModules.flatMap(module => module.lessons);
};

// Helper function to get module by ID
export const getModuleById = (id: string): Module | undefined => {
  return curriculumModules.find(module => module.id === id);
};

// Helper function to get lesson by ID
export const getLessonById = (id: string): VideoLesson | undefined => {
  return getAllLessons().find(lesson => lesson.id === id);
};
