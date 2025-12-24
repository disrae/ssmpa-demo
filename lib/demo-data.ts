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
    icon: '1.',
    learningObjectives: [
      'Understand provincial licensing structure',
      'Identify personal legal responsibilities',
      'Recognize basic food safety hazards'
    ],
    lessons: [
      {
        id: 'module1-bc-program',
        title: 'BC Meat Inspection Program Overview',
        description: 'Understanding the provincial meat inspection framework and requirements',
        duration: 600, // 10:00
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        questions: [
          {
            id: 'q1-1',
            time: 5,
            type: 'multiple-choice',
            question: 'What is the primary purpose of the BC Meat Inspection Program?',
            options: [
              'To regulate restaurant operations',
              'To ensure safe meat production and protect public health',
              'To collect taxes on meat sales',
              'To promote international meat exports'
            ],
            correctAnswer: 1,
            explanation: 'The BC Meat Inspection Program ensures meat safety and protects public health through regulatory oversight.',
            wrongAnswerHints: [
              'Consider the core mission of meat inspection programs - what is their primary goal?',
              '', // Correct answer
              'Meat inspection is about safety and health, not revenue collection.',
              'While exports are important, the primary focus is domestic food safety.'
            ]
          },
          {
            id: 'q1-2',
            time: 10,
            type: 'true-false',
            question: 'Meat inspection programs help prevent foodborne illnesses.',
            correctAnswer: true,
            explanation: 'Regular inspection and oversight prevent contamination and ensure meat safety.',
            wrongAnswerHints: 'Consider how meat inspection contributes to public health and food safety.'
          },
          {
            id: 'q1-3',
            time: 15,
            type: 'multiple-choice',
            question: 'Which of these is a key component of meat inspection?',
            options: [
              'Facility design review',
              'Employee uniform selection',
              'Marketing strategy development',
              'Social media management'
            ],
            correctAnswer: 0,
            explanation: 'Facility design is critical for maintaining sanitary conditions and preventing contamination.',
            wrongAnswerHints: [
              '', // Correct answer
              'Uniforms are important but not the core inspection focus.',
              'Marketing is not part of meat inspection requirements.',
              'Social media management has no role in food safety inspection.'
            ]
          },
          {
            id: 'q1-4',
            time: 20,
            type: 'true-false',
            question: 'Personal hygiene is important for meat processors.',
            correctAnswer: true,
            explanation: 'Clean hands, clothing, and practices prevent contamination during meat processing.',
            wrongAnswerHints: 'Think about how human contact can affect meat safety and quality.'
          },
          {
            id: 'q1-5',
            time: 25,
            type: 'multiple-choice',
            question: 'What temperature should meat be kept at during processing?',
            options: [
              'Room temperature',
              'Below 4°C (39°F)',
              'Above 60°C (140°F)',
              'Freezing at -18°C (0°F)'
            ],
            correctAnswer: 1,
            explanation: 'Cold temperatures prevent bacterial growth and maintain meat quality and safety.',
            wrongAnswerHints: [
              'Room temperature promotes bacterial growth and spoilage.',
              '', // Correct answer
              'High temperatures are for cooking, not processing/storage.',
              'Freezing preserves meat but is not the standard processing temperature.'
            ]
          },
          {
            id: 'q1-6',
            time: 30,
            type: 'true-false',
            question: 'Record keeping is required for meat processing operations.',
            correctAnswer: true,
            explanation: 'Detailed records track processes, temperatures, and inspections for compliance and traceability.',
            wrongAnswerHints: 'Consider regulatory requirements - what documentation is typically needed?'
          }
        ]
      },
      {
        id: 'module1-licensing',
        title: 'Class D vs E Licensing Requirements',
        description: 'Comparing Class D and Class E licensing structures and eligibility',
        duration: 600, // 10:00
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        questions: []
      },
      {
        id: 'module1-responsibilities',
        title: 'Personal Responsibility and Legal Obligations',
        description: 'Legal obligations and ethical considerations for meat processors',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module1-food-safety',
        title: 'Basic Food Safety Principles',
        description: 'Fundamental food safety concepts and hazard prevention',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Facility Design & Equipment',
    description: 'Slaughter area requirements, equipment specifications, and sanitation protocols',
    icon: '2.',
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
    icon: '3.',
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
    icon: '4.',
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
    icon: '5.',
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
    title: 'Post-Mortem Inspection & Chilling',
    description: 'Post-mortem inspection procedures, specified risk material handling, and carcass chilling requirements',
    icon: '6.',
    learningObjectives: [
      'Conduct thorough post-mortem inspections',
      'Handle specified risk materials safely',
      'Implement proper chilling protocols'
    ],
    lessons: [
      {
        id: 'module6-post-mortem',
        title: 'Post-Mortem Inspection Procedures',
        description: 'Systematic inspection of carcasses and organs for abnormalities',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module6-risk-materials',
        title: 'Specified Risk Material Identification',
        description: 'Identifying and properly handling high-risk tissues',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module6-chilling',
        title: 'Carcass Chilling Requirements',
        description: 'Temperature control and chilling protocols for food safety',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module6-quality',
        title: 'Quality Assessment',
        description: 'Evaluating carcass quality and grading standards',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      }
    ]
  },
  {
    id: 'module-7',
    title: 'Food Safety Plans & Documentation',
    description: 'Developing comprehensive food safety plans, SOPs, and record-keeping systems',
    icon: '7.',
    learningObjectives: [
      'Create comprehensive food safety plans',
      'Develop facility-specific SOPs and SSOPs',
      'Maintain proper documentation for licensing'
    ],
    lessons: [
      {
        id: 'module7-plans',
        title: 'Developing Food Safety Plans',
        description: 'Creating comprehensive plans to identify and control hazards',
        duration: 1200, // 20:00 (10-20 minutes, using upper bound for text content)
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module7-sops',
        title: 'Standard Operating Procedures (SOPs)',
        description: 'Developing facility-specific operating procedures',
        duration: 1200, // 20:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module7-ssops',
        title: 'Sanitation Standard Operating Procedures (SSOPs)',
        description: 'Cleaning and sanitation protocols for food safety',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module7-records',
        title: 'Record Keeping and Traceability',
        description: 'Maintaining documentation for regulatory compliance',
        duration: 1200, // 20:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      }
    ]
  },
  {
    id: 'module-8',
    title: 'Species-Specific Applications',
    description: 'Processing techniques and requirements for different animal species',
    icon: '8.',
    learningObjectives: [
      'Adapt procedures for different species',
      'Identify species-specific requirements',
      'Customize operations for target animals'
    ],
    lessons: [
      {
        id: 'module8-cattle',
        title: 'Cattle/Bison Processing',
        description: 'Specialized techniques for cattle and bison slaughter',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module8-pigs',
        title: 'Pig Processing (Scalding/Dehairing)',
        description: 'Scalding and dehairing techniques for pigs',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module8-sheep-goat',
        title: 'Sheep/Goat Processing',
        description: 'Processing techniques for sheep and goats',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module8-poultry',
        title: 'Poultry Processing (Scalding/Plucking)',
        description: 'Scalding and plucking methods for poultry',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module8-rabbit',
        title: 'Rabbit Processing',
        description: 'Specialized processing techniques for rabbits',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      }
    ]
  },
  {
    id: 'module-9',
    title: 'Regulatory Compliance & Licensing',
    description: 'Understanding provincial and federal requirements, licensing processes, and compliance',
    icon: '9.',
    learningObjectives: [
      'Navigate licensing application process',
      'Prepare for regulatory inspections',
      'Maintain ongoing compliance'
    ],
    lessons: [
      {
        id: 'module9-provincial-federal',
        title: 'Provincial vs Federal Requirements',
        description: 'Understanding different regulatory jurisdictions and requirements',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module9-application',
        title: 'Licensing Application Process',
        description: 'Step-by-step guide to obtaining slaughter licenses',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module9-inspection',
        title: 'Inspection Preparation',
        description: 'Preparing facilities and operations for regulatory inspections',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module9-compliance',
        title: 'Ongoing Compliance Requirements',
        description: 'Maintaining compliance with regulatory standards',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      }
    ]
  },
  {
    id: 'module-10',
    title: 'SSMPA Mobile Slaughter Trailer Operation',
    description: 'Operating mobile slaughter units, licensing requirements, and regulatory compliance',
    icon: '10.',
    learningObjectives: [
      'Navigate licensing application process',
      'Safely transport and operate mobile slaughter trailers under Federal Transport & MAFF'
    ],
    lessons: [
      {
        id: 'module10-basic-operation',
        title: 'Basic Operation: Transport, Hook-up & Setup',
        description: 'Trailer transport, hook-up procedures, equipment requirements, and basic operations',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-licensing',
        title: 'Provincial Meat Inspection License',
        description: 'Class D/E licenses and MAFF requirements for mobile slaughter units',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-farmgate',
        title: 'Farmgate License & Approved Docking Sites',
        description: 'Legal requirements for on-farm sales and approved operating locations',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-transport-regulations',
        title: 'Federal Transport Regulations',
        description: 'Part XII of Health of Animals Regulations for animal transport and welfare',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-training',
        title: 'Training & Local Permits',
        description: 'Operator training requirements and local permitting processes',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-hygiene',
        title: 'Hygiene, Sanitation & Inspections',
        description: 'Cleaning protocols, sanitation procedures, and compliance requirements',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-traceability',
        title: 'Traceability & Biosecurity',
        description: 'Modern protocols for food traceability and biosecurity measures',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
      },
      {
        id: 'module10-towing',
        title: 'Trailer Towing & Animal Transport',
        description: 'Towing requirements and animal transport regulations',
        duration: 600, // 10:00
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        questions: []
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
