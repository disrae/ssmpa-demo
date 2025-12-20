# SSMPA Interactive Training Demo - Architecture & Implementation Plan

## Demo Purpose
Build a minimal viable demo that showcases the core interactive video concept for SSMPA's slaughter licensing curriculum:
- Video player as the main focus of the interface
- Questions pop up during video playback at strategic points
- Simple curriculum viewer for navigation
- Progress tracking and feedback system

## App Architecture

### User Experience Approach
**"Throw them in" Demo Strategy:**
- Users land directly in an active lesson (no landing page required)
- Video starts playing immediately to show the core interactive experience
- Curriculum overview is accessible but optional (sidebar toggle or corner button)
- Fast, immersive experience that demonstrates value immediately

### Technology Stack
- **Frontend Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React hooks (useState, useEffect)
- **Video Playback:** HTML5 `<video>` element
- **Deployment:** Vercel (for demo hosting)

### Component Architecture

#### Core Components

**1. App Layout (`app/layout.tsx`)**
- Minimal layout with SSMPA branding
- Global styles and fonts
- Direct routing to demo experience

**2. Demo Page (`app/page.tsx`) - MAIN ENTRY POINT**
- Loads immediately when visiting root URL
- Video starts playing automatically
- Minimal UI overlay with curriculum access option
- Manages all demo state and interactions

**4. VideoPlayer (`components/VideoPlayer.tsx`)**
- HTML5 video wrapper with always-visible controls
- Time tracking and pause functionality
- Prevents manual play during active questions
- Takes center stage of the interface
- Responsive design for mobile/desktop

**5. QuestionOverlay (`components/QuestionOverlay.tsx`)**
- Modal overlay that appears during video pauses
- Supports multiple question types
- Three action buttons: Submit Answer, Try Again, Watch Again
- Answer validation and feedback
- Full-screen interruption for engagement

**5. CurriculumSidebar (`components/CurriculumSidebar.tsx`)**
- Collapsible sidebar (toggle from corner button)
- Tree structure of all curriculum modules
- Progress indicators and completion status
- Quick navigation between lessons
- Module descriptions and learning objectives

### Navigation & Tree Structure

#### Curriculum Tree Structure
```
SSMPA Slaughter Licensing Curriculum
├── 📺 Module 1: Introduction to Slaughter Licensing & Safety (CURRENT)
│   ├── Video: Welcome & Overview (3:00)
│   ├── Video: Regulatory Framework (5:30)
│   └── Video: Personal Responsibilities (4:15)
├── 🏭 Module 2: Facility Design & Equipment
│   ├── Video: Slaughter Area Requirements (6:00)
│   ├── Video: Equipment Standards (7:30)
│   └── Video: Sanitation Protocols (5:45)
├── 🐄 Module 3: Pre-Slaughter Management
│   ├── Video: Animal Welfare Codes (4:30)
│   ├── Video: Transport Requirements (5:15)
│   └── Video: Ante-Mortem Inspection (6:00)
├── ⚡ Module 4: Humane Slaughter Methods
│   ├── Video: Stunning Methods (8:00)
│   ├── Video: Species-Specific Requirements (7:30)
│   └── Video: Insensibility Confirmation (5:45)
├── 🔪 Module 5: Bleeding & Carcass Processing
│   ├── Video: Bleeding Techniques (6:30)
│   ├── Video: Carcass Splitting (7:00)
│   └── Video: Organ Inspection (5:30)
└── 🧊 Module 6: Food Safety & HACCP
    ├── Video: HACCP Principles (8:00)
    ├── Video: Temperature Control (6:15)
    └── Video: Documentation (4:45)
```

#### Navigation UX Pattern
**Primary Experience (Immersive):**
- User lands directly in Module 1, Video 1
- Video auto-plays immediately
- Minimal UI - just video player and subtle controls

**Curriculum Access (Optional):**
- Small "📚 Curriculum" button in top-right corner
- Toggles collapsible sidebar with full module tree
- Shows progress dots (○ completed, ● current, ◦ upcoming)
- Click any module to jump to that lesson

**In-Lesson Navigation:**
- Next/Previous buttons appear after each video completes
- "Jump to Module X" quick-access buttons
- Progress bar shows overall curriculum completion

#### Data Flow

```
User Visits → Auto-load Demo → Video Plays → Questions Pop Up → Answer → Feedback → Continue → Complete → Next Lesson Available
                                      ↓
                    Curriculum Toggle → Sidebar → Module Selection → Jump to Lesson
```

#### State Management

**Demo State:**
- `currentTime`: Current video playback time
- `isPlaying`: Video playback status
- `currentQuestion`: Active question object
- `showOverlay`: Question overlay visibility
- `answers`: Array of user responses
- `progress`: Module completion status

### File Structure

```
ssmpa-demo/
├── app/
│   ├── layout.tsx          # Minimal layout with branding
│   ├── page.tsx           # MAIN DEMO ENTRY - auto-plays video
│   ├── globals.css        # Global styles
│   └── globals.css        # Global styles
├── components/
│   ├── VideoPlayer.tsx    # Main video playback component
│   ├── QuestionOverlay.tsx # Question modal system
│   ├── CurriculumSidebar.tsx # Collapsible curriculum navigation
│   └── ui/               # Reusable UI components
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── ProgressDots.tsx
├── lib/
│   ├── demo-data.ts      # Sample curriculum content and questions
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
└── public/
    └── videos/           # Video assets
        ├── module1-intro.mp4
        ├── module1-regulatory.mp4
        └── module1-responsibilities.mp4
```

## Implementation Steps with Checkboxes

### Phase 1: Project Setup & Foundation
- [ ] **Install additional dependencies** (if needed)
- [ ] **Create component folder structure** (`components/`, `lib/`)
- [ ] **Update layout.tsx** with minimal SSMPA branding
- [ ] **Convert main page.tsx to direct demo entry** (remove landing page)
- [ ] **Create demo-data.ts** with curriculum structure

### Phase 2: Video Player Component
- [ ] **Create VideoPlayer component** with HTML5 video element
- [ ] **Implement time tracking** (`onTimeUpdate` handler)
- [ ] **Add custom controls** (play/pause, progress, volume)
- [ ] **Make responsive** for mobile and desktop
- [ ] **Test video playback** with sample content

### Phase 3: Question System
- [ ] **Create QuestionOverlay component** with modal design
- [ ] **Implement question types** (multiple choice, true/false)
- [ ] **Add answer validation** logic
- [ ] **Create feedback display** for correct/incorrect answers
- [ ] **Handle overlay positioning** and accessibility

### Phase 4: Demo Integration
- [ ] **Connect video timing to questions** (pause at specific times)
- [ ] **Implement question sequence** (multiple questions per video)
- [ ] **Add progress tracking** (question completion status)
- [ ] **Create demo state management** (current question, answers)
- [ ] **Test complete interaction flow**

### Phase 5: Curriculum Viewer
- [ ] **Create CurriculumViewer component** with module list
- [ ] **Add module navigation** (select different demo modules)
- [ ] **Implement progress indicators** (completed vs pending)
- [ ] **Add module descriptions** and learning objectives
- [ ] **Connect to demo page** routing

### Phase 6: Content & Polish
- [ ] **Create sample video content** (placeholder or real demo video)
- [ ] **Add sample questions** with realistic SSMPA content
- [ ] **Implement mobile responsiveness** testing
- [ ] **Add loading states** and error handling
- [ ] **Polish UI/UX** and accessibility features

### Phase 7: Testing & Deployment
- [ ] **Cross-browser testing** (Chrome, Safari, Firefox)
- [ ] **Mobile device testing** (iOS Safari, Android Chrome)
- [ ] **Video compatibility** testing across devices
- [ ] **User flow testing** (complete demo experience)
- [ ] **Deploy to Vercel** for live demo access

## Demo Flow

### Primary User Journey (Immersive)
1. **Direct Entry** → User visits site, video auto-plays immediately
2. **At 30 seconds** → Video pauses, question pops up with three options
3. **User Choice:**
   - **Submit Answer** → Validation feedback, video continues
   - **Try Again** → Form clears, user can re-answer
   - **Watch Again** → Video restarts from beginning
4. **End of video** → Next lesson loads automatically OR user navigates
5. **Curriculum Access** → Optional sidebar exploration available anytime

### Secondary Navigation Flows
- **Curriculum Toggle** → Click "📚 Curriculum" → Browse full module tree
- **Module Jump** → Select any module from sidebar → Jump to that lesson
- **Lesson Navigation** → Next/Previous buttons between videos in same module

### Key UX Principles
- **Zero friction entry** - video starts playing before user takes any action
- **Progressive disclosure** - curriculum complexity revealed on demand
- **Always accessible navigation** - can explore curriculum at any point
- **Clear progress indication** - visual feedback on completion status

This "throw them in" approach immediately demonstrates the interactive video value while keeping full curriculum navigation available for exploration.

## Data Structure

### Question Types
```typescript
interface Question {
  id: string;
  time: number; // seconds into video
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: number | boolean | string;
  explanation: string; // feedback text
}
```

### Module Structure
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  duration: number;
  questions: Question[];
  learningObjectives: string[];
}
```

## Success Criteria

- [ ] Video loads and plays smoothly on desktop and mobile
- [ ] Questions appear at correct timestamps during playback
- [ ] Users can answer questions and receive immediate feedback
- [ ] Demo completes full user journey from landing to completion
- [ ] Interface is responsive and accessible
- [ ] Core interactive concept is clearly demonstrated

## Risk Mitigation

- **Video Loading:** Use progressive loading and error fallbacks
- **Timing Accuracy:** Test question triggers across different devices
- **Mobile Compatibility:** Prioritize mobile-first responsive design
- **Content Sensitivity:** Use appropriate educational content for demo

This architecture provides a focused demo that clearly showcases the interactive video learning innovation while remaining simple to implement and maintain.
