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
  implemented: boolean;
}

export const curriculumModules: Module[] = [
  {
    id: 'module-1',
    title: 'Slaughter Licensing & Safety',
    description: 'Regulatory requirements and safety protocols (Coming Soon)',
    icon: '1.',
    implemented: false,
    learningObjectives: [
      'Understand provincial licensing structure',
      'Identify personal legal responsibilities',
      'Recognize basic food safety hazards'
    ],
    lessons: [
      {
        id: 'module1-placeholder',
        title: 'Licensing Requirements',
        description: 'BC Meat Inspection Program requirements (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Facility Design & Equipment',
    description: 'Slaughter area requirements and equipment setup (Coming Soon)',
    icon: '2.',
    implemented: false,
    learningObjectives: [
      'Design compliant slaughter facilities',
      'Select appropriate equipment',
      'Implement sanitation protocols'
    ],
    lessons: [
      {
        id: 'module2-placeholder',
        title: 'Equipment Standards',
        description: 'Facility and equipment requirements (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Animal Welfare & Handling',
    description: 'Pre-slaughter management and welfare standards (Coming Soon)',
    icon: '3.',
    implemented: false,
    learningObjectives: [
      'Assess animal welfare and fitness',
      'Implement low-stress handling',
      'Conduct ante-mortem inspections'
    ],
    lessons: [
      {
        id: 'module3-placeholder',
        title: 'Welfare Codes',
        description: 'Animal welfare standards and protocols (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Turkey Processing & Slaughter',
    description: 'Complete turkey slaughter process from live bird to finished product',
    icon: '4.',
    implemented: true,
    learningObjectives: [
      'Master humane turkey handling techniques',
      'Execute proper stunning and bleeding procedures',
      'Perform scalding, plucking, and evisceration',
      'Ensure product quality and food safety'
    ],
    lessons: [
      {
        id: 'turkey-handling',
        title: 'Live Bird Handling & Welfare',
        description: 'Proper turkey handling techniques for animal welfare and product quality',
        duration: 180, // Based on transcript timing
        videoSrc: 'https://stream.mux.com/GCXxvCf5WuO01VtiRlGjuXQgRmY9TnArm6EeO800UJtY8.m3u8',
        questions: [
          {
            id: 'handling-1',
            time: 2,
            type: 'true-false',
            question: 'Turkeys should be overcrowded in transport trailers to maximize efficiency.',
            correctAnswer: false,
            explanation: 'Overcrowding increases stress, injury risk, and product quality issues. Use compartments and avoid piling.',
            wrongAnswerHints: 'Consider how overcrowding affects animal welfare and final product quality.'
          },
          // {
          //   id: 'handling-2',
          //   time: 75,
          //   type: 'multiple-choice',
          //   question: 'Why should transport trailers be partially blacked out?',
          //   options: [
          //     'To prevent birds from seeing predators',
          //     'To keep birds calmer during handling',
          //     'To block sunlight for temperature control',
          //     'To hide the trailer from neighbors'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'Blacking out trailers reduces light exposure, helping keep turkeys calmer during transport and handling.',
          //   wrongAnswerHints: [
          //     'Predator protection is important but not the main reason for blacking out trailers.',
          //     '', // Correct answer
          //     'Temperature control is important but light reduction is key for calmer birds.',
          //     'Neighbor visibility is not a primary concern for trailer blackout.'
          //   ]
          // },
          // {
          //   id: 'handling-3',
          //   time: 100,
          //   type: 'multiple-choice',
          //   question: 'When handling turkeys, you should grab them by:',
          //   options: [
          //     'One foot only',
          //     'The neck',
          //     'Both feet simultaneously',
          //     'The wings'
          //   ],
          //   correctAnswer: 2,
          //   explanation: 'Grabbing both feet allows you to lift the turkey safely without letting its breast hit the floor.',
          //   wrongAnswerHints: [
          //     'One foot creates imbalance and potential injury.',
          //     'Neck grabbing can cause stress and injury.',
          //     '', // Correct answer
          //     'Wing grabbing can cause flapping and bruising.'
          //   ]
          // },
          // {
          //   id: 'handling-4',
          //   time: 140,
          //   type: 'true-false',
          //   question: 'You should let turkeys flap their wings freely during handling to prevent bruising.',
          //   correctAnswer: false,
          //   explanation: 'Prevent flapping to avoid wing bruising against hard surfaces. Handle calmly and gently.',
          //   wrongAnswerHints: 'Think about how wing flapping can damage both the bird and the meat quality.'
          // }
        ]
      },
      {
        id: 'turkey-stunning',
        title: 'Stunning & Bleeding Procedures',
        description: 'Humane stunning techniques and proper bleeding methods',
        duration: 180, // Based on transcript timing
        videoSrc: 'https://stream.mux.com/Ai3oErF025rXJ5pEFTG3VO7fiiOwV3VTbyDbKbiv6o700.m3u8',
        questions: [
          // {
          //   id: 'stunning-1',
          //   time: 20,
          //   type: 'true-false',
          //   question: 'Stunning before sticking is required for animal welfare certification.',
          //   correctAnswer: true,
          //   explanation: 'Stunning ensures insensibility before bleeding, meeting welfare standards and preventing suffering.',
          //   wrongAnswerHints: 'Consider why stunning is a best practice and certification requirement.'
          // },
          // {
          //   id: 'stunning-2',
          //   time: 50,
          //   type: 'multiple-choice',
          //   question: 'What type of sticking knife is recommended for poultry?',
          //   options: [
          //     'Wide-bladed butcher knife',
          //     'Thin, narrow blade sharp on both sides at the front',
          //     'Serrated edge knife',
          //     'Electric carving knife'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'A thin, narrow poultry sticking knife with both sides sharp at the front ensures clean severance of all neck vessels.',
          //   wrongAnswerHints: [
          //     'Wide blades are better for larger animals.',
          //     '', // Correct answer
          //     'Serrated edges tear rather than cut cleanly.',
          //     'Electric knives are not designed for sticking.'
          //   ]
          // },
          // {
          //   id: 'stunning-3',
          //   time: 95,
          //   type: 'multiple-choice',
          //   question: 'Where should the stun gun be placed on a turkey?',
          //   options: [
          //     'On the side of the head',
          //     'On the back of the head',
          //     'On the beak',
          //     'On the neck'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'The stun gun is placed on the back of the head to ensure proper stunning and prevent movement.',
          //   wrongAnswerHints: [
          //     'Side placement may not achieve full stunning.',
          //     '', // Correct answer
          //     'Beak placement is ineffective.',
          //     'Neck placement risks incomplete stunning.'
          //   ]
          // },
          // {
          //   id: 'stunning-4',
          //   time: 120,
          //   type: 'true-false',
          //   question: "You should check for insensibility after stunning by examining the bird's eye.",
          //   correctAnswer: true,
          //   explanation: 'Checking the eye helps confirm the bird is properly stunned and insensible before proceeding.',
          //   wrongAnswerHints: 'Consider how you can verify that stunning was effective.'
          // },
          // {
          //   id: 'stunning-5',
          //   time: 145,
          //   type: 'multiple-choice',
          //   question: 'How is the sticking performed?',
          //   options: [
          //     'Multiple cuts on both sides of the neck',
          //     'Single transverse cut behind the jaw',
          //     'Longitudinal cut down the neck',
          //     'Circular cut around the neck'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'A single transverse stick behind the jaw severs all major blood vessels for complete bleeding.',
          //   wrongAnswerHints: [
          //     'Multiple cuts are unnecessary and prolong suffering.',
          //     '', // Correct answer
          //     "Longitudinal cuts don't sever all vessels efficiently.",
          //     'Circular cuts are not the standard method.'
          //   ]
          // }
        ]
      },
      {
        id: 'turkey-scalding',
        title: 'Scalding & Plucking Preparation',
        description: 'Pre-plucking feather removal and scalder monitoring',
        duration: 120, // Based on transcript timing
        videoSrc: 'https://stream.mux.com/gdQQtReUs2AWFaYJKW02k7t2FiWBeDox73IL19bYFCaM.m3u8',
        questions: [
          // {
          //   id: 'scalding-1',
          //   time: 45,
          //   type: 'multiple-choice',
          //   question: 'Why should primary wing feathers and tail feathers be removed before plucking?',
          //   options: [
          //     "To improve the bird's appearance",
          //     'To prevent plucker clogging and reduce cleanup',
          //     'To make handling easier',
          //     'To meet customer preferences'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'Removing these feathers prevents clogging and reduces how often the feather bin needs emptying.',
          //   wrongAnswerHints: [
          //     'Appearance is secondary to functionality.',
          //     '', // Correct answer
          //     'While easier handling is a benefit, clogging prevention is primary.',
          //     'Customer preferences vary, but clogging prevention is essential.'
          //   ]
          // },
          // {
          //   id: 'scalding-2',
          //   time: 90,
          //   type: 'true-false',
          //   question: 'The scalder should be monitored for proper temperature and revolutions.',
          //   correctAnswer: true,
          //   explanation: 'Regular monitoring ensures the scalder maintains proper temperature and speed for effective feather loosening.',
          //   wrongAnswerHints: "Consider what can go wrong if the scalder isn't functioning properly."
          // }
        ]
      },
      {
        id: 'turkey-evisceration',
        title: 'Evisceration & Final Processing',
        description: 'Organ removal and carcass finishing procedures',
        duration: 240, // Based on transcript timing
        videoSrc: 'https://stream.mux.com/gdQQtReUs2AWFaYJKW02k7t2FiWBeDox73IL19bYFCaM.m3u8',
        questions: [
          // {
          //   id: 'evisceration-1',
          //   time: 25,
          //   type: 'multiple-choice',
          //   question: 'Where is the crop located on a turkey?',
          //   options: [
          //     'In the abdominal cavity',
          //     'Under the neck skin in the quarter area',
          //     'In the chest cavity',
          //     'Attached to the backbone'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'The crop is located under the neck skin, typically in the quarter area, and must be carefully removed.',
          //   wrongAnswerHints: [
          //     'The crop is not in the main body cavities.',
          //     '', // Correct answer
          //     'The crop is in the neck area, not chest.',
          //     'The crop is a digestive organ in the neck region.'
          //   ]
          // },
          // {
          //   id: 'evisceration-2',
          //   time: 75,
          //   type: 'true-false',
          //   question: 'The gallbladder should be carefully pinched off from the liver.',
          //   correctAnswer: true,
          //   explanation: 'Pinching off the gallbladder prevents bile leakage which can contaminate the meat and cause off-flavors.',
          //   wrongAnswerHints: 'Consider why the gallbladder needs special handling during liver removal.'
          // },
          // {
          //   id: 'evisceration-3',
          //   time: 120,
          //   type: 'multiple-choice',
          //   question: 'What should be removed from the carcass during evisceration?',
          //   options: [
          //     'Only the intestines',
          //     'Heart, liver, lungs, kidneys, trachea, and glands',
          //     'Just the crop and neck',
          //     'Only visible organs'
          //   ],
          //   correctAnswer: 1,
          //   explanation: 'All specified risk materials including heart, liver, lungs, kidneys, trachea, and glands must be removed.',
          //   wrongAnswerHints: [
          //     'More than just intestines need removal.',
          //     '', // Correct answer
          //     'The neck and crop are removed separately.',
          //     'All organs and tissues must be properly identified and removed.'
          //   ]
          // },
          // {
          //   id: 'evisceration-4',
          //   time: 180,
          //   type: 'true-false',
          //   question: 'The trachea must be completely removed from the neck area.',
          //   correctAnswer: true,
          //   explanation: 'The trachea is considered specified risk material and must be fully removed during processing.',
          //   wrongAnswerHints: 'Consider which tissues are classified as specified risk materials.'
          // }
        ]
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Other Poultry Processing',
    description: 'Chicken, duck, and other poultry species (Coming Soon)',
    icon: '5.',
    implemented: false,
    learningObjectives: [
      'Adapt procedures for different poultry species',
      'Handle various bird sizes and temperaments',
      'Species-specific processing techniques'
    ],
    lessons: [
      {
        id: 'module5-placeholder',
        title: 'Chicken Processing',
        description: 'Chicken-specific slaughter and processing methods (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Red Meat Processing',
    description: 'Beef, pork, lamb, and goat processing (Coming Soon)',
    icon: '6.',
    implemented: false,
    learningObjectives: [
      'Large animal handling and stunning',
      'Carcass splitting and trimming',
      'Aging and quality assessment'
    ],
    lessons: [
      {
        id: 'module6-placeholder',
        title: 'Beef Processing',
        description: 'Cattle and bison slaughter procedures (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  },
  {
    id: 'module-7',
    title: 'Food Safety & Quality Control',
    description: 'HACCP plans, record keeping, and inspection preparation (Coming Soon)',
    icon: '7.',
    implemented: false,
    learningObjectives: [
      'Develop comprehensive food safety plans',
      'Maintain proper documentation',
      'Prepare for regulatory inspections'
    ],
    lessons: [
      {
        id: 'module7-placeholder',
        title: 'HACCP Implementation',
        description: 'Hazard Analysis Critical Control Points (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  },
  {
    id: 'module-8',
    title: 'Mobile Slaughter Operations',
    description: 'Trailer operations, transport regulations, and farmgate licensing (Coming Soon)',
    icon: '8.',
    implemented: false,
    learningObjectives: [
      'Operate mobile slaughter units safely',
      'Navigate transport regulations',
      'Obtain farmgate and provincial licenses'
    ],
    lessons: [
      {
        id: 'module8-placeholder',
        title: 'Mobile Unit Operations',
        description: 'Trailer setup and on-site processing (Not yet implemented)',
        duration: 600,
        videoSrc: '',
        questions: []
      }
    ]
  }
];

// Helper function to get current lesson (for demo, start with turkey handling)
export const getCurrentLesson = (): VideoLesson => {
  return curriculumModules[3].lessons[0]; // Start with turkey handling
};

// Helper function to get all lessons for navigation
export const getAllLessons = (): VideoLesson[] => {
  return curriculumModules.flatMap(module => module.lessons);
};

// Helper function to get turkey lessons only (for demo navigation)
export const getTurkeyLessons = (): VideoLesson[] => {
  return curriculumModules[3].lessons; // Turkey module is at index 3
};

// Helper function to get module by ID
export const getModuleById = (id: string): Module | undefined => {
  return curriculumModules.find(module => module.id === id);
};

// Helper function to get lesson by ID
export const getLessonById = (id: string): VideoLesson | undefined => {
  return getAllLessons().find(lesson => lesson.id === id);
};
