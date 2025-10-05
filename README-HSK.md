# HSK Flashcard App

A modern, minimalist flashcard application for learning HSK (Hanyu Shuiping Kaoshi) Chinese vocabulary across all 7 levels.

## Features

- **Two Learning Modes:**
  - **Flashcard Mode:** Interactive flip cards showing Chinese characters, pinyin, and meanings
  - **Quiz Mode:** Multiple-choice questions to test your knowledge with instant feedback

- **7 HSK Levels:** Choose from HSK 1 through HSK 7, each containing authentic vocabulary data

- **Modern UI/UX:** 
  - Clean, minimalist design with smooth animations
  - Color scheme: Mint (#DDF4E7), Green (#67C090), Teal (#26667F), Navy (#124170)
  - Responsive layout for all device sizes

- **Progress Tracking:** In quiz mode, track your score and see how well you're learning

## Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for beautiful icons
- Custom hooks for state management

## Project Structure

```
src/
├── components/
│   ├── choose-mode/         # Mode selection component
│   ├── level-selector/      # HSK level picker
│   ├── flashcard-view/      # Flashcard learning interface
│   └── quiz-view/           # Quiz testing interface
├── hooks/
│   ├── use-flashcard.ts     # Flashcard state management
│   └── use-quiz.ts          # Quiz logic and scoring
├── types/
│   └── flashcard.ts         # TypeScript interfaces
├── data/                    # HSK vocabulary JSON files (1-7)
└── lib/
    └── utils.ts             # Utility functions
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## How to Use

1. **Select Mode:** Choose between Flashcard or Quiz mode
2. **Select Level:** Pick an HSK level (1-7) based on your proficiency
3. **Start Learning:**
   - **Flashcard Mode:** Click cards to flip and see meanings, use arrows to navigate
   - **Quiz Mode:** Select the correct meaning from 4 options, track your progress

## Color Palette

- **Mint** (#DDF4E7) - Background, light accents
- **Green** (#67C090) - Primary buttons, success states
- **Teal** (#26667F) - Secondary actions, text highlights
- **Navy** (#124170) - Main text, dark UI elements

## Data Format

The app uses HSK vocabulary data in JSON format with the following structure:
- Simplified and Traditional Chinese characters
- Pinyin pronunciation
- Multiple English meanings
- Part of speech tags
- Frequency information

## Components

All components follow a naming convention with kebab-case filenames:
- `choose-mode.tsx`
- `level-selector.tsx`
- `flashcard-view.tsx`
- `quiz-view.tsx`

Custom hooks are prefixed with `use-`:
- `use-flashcard.ts`
- `use-quiz.ts`

## License

MIT
