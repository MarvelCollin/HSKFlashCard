# HSK Flashcard

A modern, interactive flashcard and quiz application for learning Chinese HSK vocabulary (Levels 1-7).

## 🎯 Features

- **Dual Learning Modes**:
  - 🎴 **Flashcard Mode**: Interactive flip cards with 3D animations
  - 📝 **Quiz Mode**: Multiple choice questions with instant feedback
- **7 HSK Levels**: Complete vocabulary coverage from HSK 1 to HSK 7
- **Reveal Answer**: Option to see answers without submitting (study mode)
- **Progress Tracking**: Score tracking and quiz completion statistics
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Clean, minimalist design with smooth animations

## 🚀 Live Demo

Visit the live application: [https://YOUR_USERNAME.github.io/HSKFlashCard/](https://YOUR_USERNAME.github.io/HSKFlashCard/)

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** (via CDN) for styling
- **Lucide React** for icons
- **GitHub Pages** for deployment

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/HSKFlashCard.git

# Navigate to project directory
cd HSKFlashCard

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages** (IMPORTANT - Do this FIRST):
   - Go to your repository on GitHub: `https://github.com/MarvelCollin/HSKFlashCard`
   - Navigate to **Settings** → **Pages** (in left sidebar)
   - Under **Source**, select **"GitHub Actions"** from the dropdown
   - Click **Save**
   - Wait a few seconds for it to confirm

3. **Run the Workflow**:
   - Go to the **Actions** tab in your repository
   - You should see "Deploy to GitHub Pages" workflow
   - If it failed before, click **"Run workflow"** → **"Run workflow"** button
   - Or push a new commit to trigger it automatically

4. **Access Your Site**:
   - Once deployed successfully, your site will be live at:
   - `https://marvelcollin.github.io/HSKFlashCard/`
   - The URL will also appear in the Actions tab after successful deployment

### Troubleshooting:

**If you get "Not Found" error:**
1. Make sure GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions)
2. Check that your repository is public (or you have GitHub Pro for private repos)
3. Wait 2-3 minutes after the workflow completes for DNS propagation

**If the workflow fails:**
- Check the Actions tab for error details
- Ensure `package-lock.json` is committed to the repository
- Re-run the workflow after fixing any issues

### Manual Deployment:

You can also trigger deployment manually:
- Go to **Actions** tab in your repository
- Select "Deploy to GitHub Pages" workflow
- Click **"Run workflow"** → Select `main` branch → **"Run workflow"**

## 📁 Project Structure

```
HSKFlashCard/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── choose-mode.tsx     # Mode selection screen
│   │   ├── level-selector.tsx  # HSK level picker
│   │   ├── flashcard-view.tsx  # Flashcard interface
│   │   └── quiz-view.tsx       # Quiz interface
│   ├── hooks/
│   │   ├── use-flashcard.ts    # Flashcard logic
│   │   └── use-quiz.ts         # Quiz logic
│   ├── interfaces/
│   │   ├── Mode.ts             # Type definitions
│   │   ├── HSKLevel.ts
│   │   ├── IWord.ts
│   │   ├── IFlashcard.ts
│   │   ├── IQuizOption.ts
│   │   └── IAnswer.ts
│   ├── data/
│   │   └── *.min.json          # HSK vocabulary data
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── vite.config.ts              # Vite configuration
└── package.json
```

## 🎨 Color Palette

- **Mint**: `#DDF4E7` - Background
- **Green**: `#67C090` - Primary actions
- **Teal**: `#26667F` - Secondary elements
- **Navy**: `#124170` - Text and accents

## 📝 License

MIT License - feel free to use this project for learning purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with ❤️ for HSK learners
