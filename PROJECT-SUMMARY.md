# HSK Flashcard Application - Project Summary

## Overview
A complete, modern HSK (Chinese proficiency test) flashcard application with two learning modes: Flashcard and Quiz. Built with React, TypeScript, and Tailwind CSS with a beautiful, minimalist design.

## Project Structure

### Components (All follow kebab-case naming convention)
```
src/components/
├── choose-mode/
│   ├── choose-mode.tsx      # Mode selection screen (Flashcard or Quiz)
│   └── index.ts
├── level-selector/
│   ├── level-selector.tsx   # HSK level picker (1-7)
│   └── index.ts
├── flashcard-view/
│   ├── flashcard-view.tsx   # Interactive flip cards
│   └── index.ts
└── quiz-view/
    ├── quiz-view.tsx        # Multiple choice quiz
    └── index.ts
```

### Custom Hooks
```
src/hooks/
├── use-flashcard.ts         # Manages flashcard state, navigation, and flipping
└── use-quiz.ts              # Manages quiz logic, scoring, and answers
```

### TypeScript Interfaces
```
src/types/flashcard.ts
- IPronunciation: Pronunciation data structure
- IForm: Character form with meanings
- IWord: Complete word data from JSON
- IFlashcard: Simplified flashcard data
- IQuizOption: Quiz answer option
- IAnswer: User's quiz answer record
- Mode: 'flashcard' | 'quiz'
- HSKLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7
```

### Data
```
src/data/
├── 1.min.json    # HSK Level 1 vocabulary
├── 2.min.json    # HSK Level 2 vocabulary
├── 3.min.json    # HSK Level 3 vocabulary
├── 4.min.json    # HSK Level 4 vocabulary
├── 5.min.json    # HSK Level 5 vocabulary
├── 6.min.json    # HSK Level 6 vocabulary
└── 7.min.json    # HSK Level 7 vocabulary
```

## Features Implemented

### 1. Mode Selection
- Beautiful card-based UI for selecting Flashcard or Quiz mode
- Icons from Lucide React (BookOpen, CheckSquare)
- Smooth hover and click animations
- Gradient backgrounds on selection

### 2. Level Selection
- Grid layout with all 7 HSK levels
- Large, clear level numbers
- Responsive design (2 cols on mobile, 4 on tablet, 7 on desktop)
- Visual feedback on selection

### 3. Flashcard Mode
- **3D Flip Animation:** Cards flip to reveal meaning
- **Front Side:** Shows Chinese character (simplified) and pinyin
- **Back Side:** Shows pinyin and all English meanings
- **Navigation:** Previous/Next buttons with visual indicators
- **Progress Counter:** Shows current card / total cards
- **Exit Button:** Return to level selection

### 4. Quiz Mode
- **Multiple Choice:** 4 options (A, B, C, D) per question
- **Instant Feedback:** Correct answer highlights in green
- **Score Tracking:** Real-time score display
- **Progress Bar:** Current question / total questions
- **Results Screen:** Final score with percentage and trophy icon
- **Retry Option:** Reset quiz to try again
- **Navigation:** Can review previous questions

### 5. Custom Hooks

#### useFlashcard
- Loads vocabulary data for selected HSK level
- Manages current card index
- Handles card flipping state
- Provides navigation functions (next, previous)
- Loading state management

#### useQuiz
- Loads vocabulary data for selected HSK level
- Generates random quiz options (1 correct, 3 wrong)
- Tracks user answers
- Calculates score and percentage
- Manages quiz state (answered, current question)
- Provides reset functionality

## Color Palette
```css
Mint:  #DDF4E7  (Background, light accents)
Green: #67C090  (Primary buttons, success)
Teal:  #26667F  (Secondary actions, text highlights)
Navy:  #124170  (Main text, dark elements)
```

## Technology Stack
- **React 19.1.1** - Latest React with hooks
- **TypeScript 5.9.3** - Type safety throughout
- **Vite 7.1.7** - Fast build tool
- **Tailwind CSS 3.x** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **clsx & tailwind-merge** - Dynamic class management

## Key Design Principles

### 1. No Comments in Code
All code is self-documenting with clear function and variable names

### 2. Separation of Concerns
- Components handle UI only
- Hooks manage state and business logic
- Types provide clear interfaces
- Utils for shared functionality

### 3. TypeScript Best Practices
- Strict type imports (`import type`)
- Interfaces for all data structures
- Type-safe props for all components

### 4. Modern UI/UX
- Smooth animations and transitions
- Card-based layouts with shadows
- Responsive design for all screen sizes
- Accessible button states (disabled, hover, active)
- Visual feedback for all interactions

### 5. File Organization
- Kebab-case for component files
- One component per file
- Index files for clean imports
- Grouped by feature (components, hooks, types)

## Running the Application

```bash
npm install
npm run dev
```

Open browser to `http://localhost:5173` (or the port shown in terminal)

## User Flow

1. **Start Screen** → Choose Mode (Flashcard or Quiz)
2. **Level Selection** → Pick HSK Level (1-7)
3. **Learning Screen** → 
   - Flashcard: Study with flip cards
   - Quiz: Answer multiple choice questions
4. **Exit/Back** → Return to previous screen

## Data Structure Example

```typescript
{
  "s": "爱",              // Simplified Chinese
  "r": "愛",              // Radical
  "q": 130,              // Frequency
  "p": ["v","vn","b"],   // Parts of speech
  "f": [{                // Forms
    "t": "愛",           // Traditional
    "i": {               // Pronunciation info
      "y": "ài",         // Pinyin
      "n": "ai4",        // Numbered pinyin
      ...
    },
    "m": [               // Meanings (array)
      "to love",
      "to be fond of",
      ...
    ],
    "c": []              // Classifiers
  }]
}
```

## Achievements

✅ Fully functional flashcard system
✅ Complete quiz mode with scoring
✅ Beautiful, modern UI with custom color scheme
✅ TypeScript interfaces for type safety
✅ Custom hooks for clean state management
✅ Component-based architecture
✅ Responsive design
✅ Smooth animations
✅ No comments (self-documenting code)
✅ Proper file naming conventions
✅ Separated concerns (hooks, components, types)

## Future Enhancement Ideas
- Add favorites/bookmarks
- Track learning progress over time
- Add audio pronunciation
- Spaced repetition algorithm
- Study statistics dashboard
- Export/import progress
- Dark mode toggle
- Custom study sessions
