export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'order' | '3d-point';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: number | boolean | number[];
  explanation: string; // feedback text for correct answers
  wrongAnswerHints?: string[] | string; // hints for wrong answers - array for multiple choice, string for others
  targetZone?: {
    x: number;
    y: number;
    z: number;
    zones: Array<{ x: number; y: number; z: number; radius: number }>;
  };
  cameraView?: {
    position: [number, number, number];
    target: [number, number, number];
  };
}

export interface QuestionGroup {
  time: number | string; // seconds into video, or time string like "2:33"
  questions: Question[];
}

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  videoSrc: string;
  questions: QuestionGroup[];
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

import { parseTimeToSeconds } from './utils';

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
        duration: 0,
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
        duration: 0,
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
        duration: 0,
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
        duration: 149,
        videoSrc: 'https://stream.mux.com/GCXxvCf5WuO01VtiRlGjuXQgRmY9TnArm6EeO800UJtY8.m3u8',
        questions: [
          {
            time: "0:36",
            questions: [
              {
                id: 'handling-claws',
                type: 'multiple-choice',
                question: 'Why is it important to keep turkeys calm during handling?',
                options: [
                  'To prevent them from scratching each other with their sharp claws',
                  'To make them easier to catch',
                  'To reduce transport costs',
                  'To improve their appearance'
                ],
                correctAnswer: 0,
                explanation: 'Turkeys have large, powerful bodies and sharp claws. When stressed and trying to escape, they can crawl on top of each other and cause injuries that degrade meat quality.',
                wrongAnswerHints: [
                  '', // Correct answer
                  'While easier catching is a benefit, preventing claw injuries is critical for product quality.',
                  'Transport costs are not directly affected by bird calmness.',
                  'Appearance is secondary to preventing physical harm and meat quality issues.'
                ]
              }
            ]
          },
          {
            time: "1:00",
            questions: [
              {
                id: 'handling-herding',
                type: 'multiple-choice',
                question: 'Why do we line the alley with plywood when herding turkeys into the trailer?',
                options: [
                  'To make the alley look more professional',
                  'Because turkeys can easily jump over netting fences',
                  'To keep the turkeys from seeing outside',
                  'To prevent the turkeys from getting dirty'
                ],
                correctAnswer: 1,
                explanation: 'Turkeys are powerful and can easily jump over netting fences, so the alley is lined with plywood to contain them. Hurdles (plywood pieces with handles) are then used to guide them into the trailer.',
                wrongAnswerHints: [
                  'Appearance is not the primary concern for containment.',
                  '', // Correct answer
                  'While darkness helps calm them, containment is the main reason for plywood.',
                  'Cleanliness is important but not why plywood is used for the alley walls.'
                ]
              }
            ]
          },
          {
            time: "1:23",
            questions: [
              {
                id: 'handling-trailer-blackout',
                type: 'multiple-choice',
                question: 'Why do they black out the livestock trailer while keeping ventilation open?',
                options: [
                  'To prevent turkeys from seeing the outside world completely',
                  'To keep turkeys calmer during transport and handling',
                  'To maintain a consistent internal temperature',
                  'To make loading and unloading easier in any weather'
                ],
                correctAnswer: 1,
                explanation: 'Blacking out the trailer reduces light exposure while maintaining ventilation, helping keep turkeys calmer. This is especially important when handlers need to go inside to catch the birds, reducing stress and potential injuries.',
                wrongAnswerHints: [
                  'While reduced visibility helps, complete isolation from the outside world is not the primary goal.',
                  '', // Correct answer
                  'Temperature control is important but ventilation is maintained, so light reduction is key.',
                  'Weather protection is a benefit but not the main reason for blackout during handling.'
                ]
              }
            ]
          },
          {
            time: "1:59",
            questions: [
              {
                id: 'handling-wing-flapping',
                type: 'true-false',
                question: 'You should allow turkeys to flap their wings freely when moving them to prevent bruising.',
                correctAnswer: false,
                explanation: 'Prevent wing flapping to avoid bruising against hard surfaces. Handle turkeys very gently and carefully when placing them in cones or carrying them around.',
                wrongAnswerHints: 'Consider how wing flapping can cause bruising and damage to both the bird and meat quality.'
              }
            ]
          },
          {
            time: "2:22",
            questions: [
              {
                id: 'handling-complete-approach',
                type: 'multiple-choice',
                question: 'What practices help ensure safe and efficient turkey processing?',
                options: [
                  'Using electric prods',
                  'Wearing eye protection and gloves while catching only two birds at a time',
                  'Handling birds forcefully',
                  'Working quickly without safety gear to meet quotas'
                ],
                correctAnswer: 1,
                explanation: 'Safe turkey processing requires both personal protective equipment (eye protection and gloves) because handling can feel like a battle, and limiting catches to two at a time ensures birds don\'t sit in cones too long, reducing stress and maintaining meat quality.',
                wrongAnswerHints: [
                  'Electric prods are inappropriate for turkey handling and can cause unnecessary stress.',
                  '', // Correct answer
                  'Forceful handling increases stress and can damage both the bird and meat quality.',
                  'Working quickly without safety gear prioritizes speed over safety and welfare.'
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'turkey-stunning',
        title: 'Stunning & Bleeding Procedures',
        description: 'Humane stunning techniques and proper bleeding methods',
        duration: 155,
        videoSrc: 'https://stream.mux.com/Ai3oErF025rXJ5pEFTG3VO7fiiOwV3VTbyDbKbiv6o700.m3u8',
        questions: [
          {
            time: "0:20",
            questions: [
              {
                id: 'stunning-certification',
                type: 'true-false',
                question: 'Stunning before sticking is required for animal welfare certification.',
                correctAnswer: true,
                explanation: 'Stunning ensures the bird is insensible before bleeding, preventing suffering and meeting welfare standards. In addition to being a good best practice, stunning before sticking is also a requirement of animal welfare certification.',
                wrongAnswerHints: 'Stunning ensures the bird is insensible before bleeding, preventing suffering and meeting welfare standards.'
              }
            ]
          },
          {
            time: "1:19",
            questions: [
              {
                id: 'stunning-knife',
                type: 'multiple-choice',
                question: 'What type of knife is used for poultry sticking and why?',
                options: [
                  'Wide butcher knife for easy cutting',
                  'Thin, narrow poultry sticking knife sharp on both sides at the front',
                  'Serrated knife for tearing tissue',
                  'Electric knife for speed'
                ],
                correctAnswer: 1,
                explanation: 'A poultry sticking knife is thin and narrow with both sides sharp at the front. This design ensures a clean transverse cut that severs all arteries and veins in the neck during the sticking process.',
                wrongAnswerHints: [
                  'Wide knives are better for larger animals but not ideal for poultry.',
                  '', // Correct answer
                  'Serrated edges tear rather than cut cleanly through vessels.',
                  'Electric knives are not designed for precise sticking procedures.'
                ]
              }
            ]
          },
          {
            time: "1:40",
            questions: [
              {
                id: 'stunning-location',
                type: '3d-point',
                question: 'Click on the area where you should place the stun gun',
                correctAnswer: true,
                explanation: 'Correct! The stun gun should be placed right on the back of the head to ensure proper stunning.',
                targetZone: {
                  x: 0,
                  y: 0,
                  z: 0,
                  zones: [
                    { x: -0.06378170048081416, y: 68, z: 29, radius: 1.25 }
                  ]
                }
              }
            ]
          },
          {
            time: "2:07",
            questions: [
              {
                id: 'transverse-context',
                type: 'multiple-choice',
                question: 'After confirming insensibility, what does "transverse" mean when making a cut just behind the jaw?',
                options: [
                  'A vertical cut along the length of the neck',
                  'A horizontal cut straight across the neck',
                  'A circular cut around the neck',
                  'Multiple small cuts in different directions'
                ],
                correctAnswer: 1,
                explanation: 'Transverse means horizontal or across. When making a transverse cut just behind the jaw, it means cutting horizontally straight across the neck to sever all major blood vessels (arteries and veins) at once for complete and efficient bleeding.',
                wrongAnswerHints: [
                  'Vertical cuts along the neck length are not used for poultry sticking.',
                  '', // Correct answer
                  'Circular cuts are not the standard method for poultry bleeding.',
                  'Multiple cuts are unnecessary and prolong suffering.'
                ]
              },
              {
                id: 'sticking-location',
                type: '3d-point',
                question: 'Click on the area where you should perform the stick for bleeding (just below the jaw).',
                correctAnswer: true,
                explanation: 'Correct! The stick should be performed just below the jaw to sever the carotid arteries and jugular veins.',
                targetZone: {
                  x: 0,
                  y: 0,
                  z: 0,
                  zones: [
                    { x: 1.5, y: 60.5, z: 31, radius: 2.5 }, // Right side
                    { x: -1.5, y: 60.4, z: 31.3, radius: 2.5 } // Left side
                  ]
                }
              },
            ]
          },
          {
            time: "2:23",
            questions: [
              {
                id: 'stunning-sticking-procedure',
                type: 'order',
                question: 'Arrange the steps for proper poultry sticking in the correct order:',
                options: [
                  'Check for insensibility by examining the eye',
                  'Hold the head firmly to prevent bouncing',
                  'Insert knife just behind the jaw with blade facing upward',
                  'Make a single transverse cut to sever all blood vessels'
                ],
                correctAnswer: [1, 0, 2, 3],
                explanation: 'After stunning, hold the head firmly, check for insensibility by the eye, then perform a transverse stick just behind the jaw to sever all blood vessels for complete bleeding.',
                wrongAnswerHints: 'Remember: Secure the bird first, then verify stunning effectiveness, then perform the cut.'
              }
            ]
          },
          {
            time: "2:30",
            questions: [
              {
                id: 'bleeding-completion',
                type: 'true-false',
                question: 'Turkeys should be moved to scalding immediately after the transverse cut without allowing complete bleeding.',
                correctAnswer: false,
                explanation: 'Turkeys must bleed out completely until all motion stops and all blood is drained before moving to the scalder. This ensures proper blood removal and prevents contamination during processing.',
                wrongAnswerHints: 'Complete bleeding is essential for food safety and meat quality.'
              }
            ]
          }
        ]
      },
      {
        id: 'turkey-scalding',
        title: 'Scalding & Plucking Preparation',
        description: 'Pre-plucking feather removal and scalder monitoring',
        duration: 101,
        videoSrc: 'https://stream.mux.com/gdQQtReUs2AWFaYJKW02k7t2FiWBeDox73IL19bYFCaM.m3u8',
        questions: [
          {
            time: "0:54",
            questions: [
              {
                id: 'scalding-1',
                type: 'multiple-choice',
                question: 'Why should primary wing feathers and tail feathers be removed before plucking?',
                options: [
                  "To improve the bird's appearance",
                  'To prevent plucker clogging and reduce cleanup',
                  'To make handling easier',
                  'To meet customer preferences'
                ],
                correctAnswer: 1,
                explanation: 'Removing these feathers prevents clogging and reduces how often the feather bin needs emptying.',
                wrongAnswerHints: [
                  'Appearance is secondary to functionality.',
                  '', // Correct answer
                  'While easier handling is a benefit, clogging prevention is primary.',
                  'Customer preferences vary, but clogging prevention is essential.'
                ]
              }
            ]
          },
          {
            time: "1:15",
            questions: [
              {
                id: 'scalding-2',
                type: 'true-false',
                question: 'The scalder should be monitored for proper temperature and revolutions.',
                correctAnswer: true,
                explanation: 'Regular monitoring ensures the scalder maintains proper temperature and speed for effective feather loosening.',
                wrongAnswerHints: "Without proper monitoring, the scalder could overheat feathers or fail to loosen them properly, affecting plucking efficiency."
              }
            ]
          }
        ]
      },
      {
        id: 'turkey-evisceration',
        title: 'Evisceration & Final Processing',
        description: 'Organ removal and carcass finishing procedures',
        duration: 237, // Based on transcript timing
        videoSrc: 'https://stream.mux.com/Sj4rvhHDCm4i6nD4exxpkRCtbAXYhWWMO31Ydem00hG00.m3u8',
        questions: [
          {
            time: "0:53",
            questions: [
              {
                id: 'evisceration-1',
                type: 'multiple-choice',
                question: 'Where is the crop located on a turkey?',
                options: [
                  'In the abdominal cavity',
                  'Under the neck skin in the quarter area',
                  'In the chest cavity',
                  'Attached to the backbone'
                ],
                correctAnswer: 1,
                explanation: 'The crop is located under the neck skin, typically in the quarter area, and must be carefully removed.',
                wrongAnswerHints: [
                  'The crop is not in the main body cavities.',
                  '', // Correct answer
                  'The crop is in the neck area, not chest.',
                  'The crop is a digestive organ in the neck region.'
                ]
              }
            ]
          },
          {
            time: "2:02",
            questions: [
              {
                id: 'evisceration-2',
                type: 'true-false',
                question: 'The gallbladder should be carefully pinched off from the liver.',
                correctAnswer: true,
                explanation: 'Pinching off the gallbladder prevents bile leakage which can contaminate the meat and cause off-flavors.',
                wrongAnswerHints: 'The gallbladder contains bile that can leak and contaminate the meat, causing off-flavors.'
              }
            ]
          },
          {
            time: "2:38",
            questions: [
              {
                id: 'evisceration-3',
                type: 'multiple-choice',
                question: 'What should be removed from the carcass during evisceration?',
                options: [
                  'Only the intestines',
                  'Heart, liver, lungs, kidneys, trachea, and glands',
                  'Just the crop and neck',
                  'Only visible organs'
                ],
                correctAnswer: 1,
                explanation: 'All specified risk materials including heart, liver, lungs, kidneys, trachea, and glands must be removed. These tissues are classified as specified risk materials (SRMs) because they may contain prions - infectious proteins that cause diseases like bovine spongiform encephalopathy (BSE). Removing SRMs prevents potential transmission of these diseases through the food chain.',
                wrongAnswerHints: [
                  'More than just intestines need removal.',
                  '', // Correct answer
                  'The neck and crop are removed separately.',
                  'All organs and tissues must be properly identified and removed.'
                ]
              }
            ]
          },
          {
            time: "2:46",
            questions: [
              {
                id: 'evisceration-4',
                type: 'true-false',
                question: 'The trachea must be completely removed from the neck area.',
                correctAnswer: true,
                explanation: 'The trachea is considered specified risk material and must be fully removed during processing.',
                wrongAnswerHints: 'Consider which tissues are classified as specified risk materials.'
              }
            ]
          }
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
        duration: 0,
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
        duration: 0,
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
        duration: 0,
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
        duration: 0,
        videoSrc: '',
        questions: []
      }
    ]
  }
];

// Helper function to get current lesson (for demo, start with turkey stunning)
export const getCurrentLesson = (): VideoLesson => {
  return curriculumModules[3].lessons[3];
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
