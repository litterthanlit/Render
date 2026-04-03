## **Context**

Build an interactive web learning platform from scratch that trains designers to become design engineers. The repo is empty (just scaffolded with Next.js 16 \+ TypeScript \+ Tailwind CSS 4). The platform needs a beautiful dark-themed UI, interactive coding exercises with live preview, structured curriculum, and progress tracking.

## **Architecture**

### **Tech Stack (already scaffolded)**

* Next.js 16 (App Router) \+ TypeScript  
* Tailwind CSS 4  
* localStorage for progress persistence (no DB needed for MVP)

### **File Structure**

src/  
├── app/  
│   ├── globals.css          ✅ (customized with dark theme, animations)  
│   ├── layout.tsx           (update: metadata, dark theme)  
│   ├── page.tsx             (landing page)  
│   ├── tracks/  
│   │   ├── page.tsx         (all learning tracks)  
│   │   └── \[trackId\]/  
│   │       ├── page.tsx     (track detail with module/lesson list)  
│   │       └── \[lessonId\]/  
│   │           └── page.tsx (interactive lesson \+ code editor)  
│   └── playground/  
│       └── page.tsx         (free-form code playground)  
├── components/  
│   ├── Navigation.tsx       (top nav bar)  
│   ├── Footer.tsx           (site footer)  
│   ├── TrackCard.tsx        (track preview card)  
│   ├── LessonCard.tsx       (lesson list item)  
│   ├── CodeEditor.tsx       (textarea-based code editor)  
│   ├── LivePreview.tsx      (iframe-based live preview)  
│   ├── ProgressBar.tsx      (visual progress indicator)  
│   ├── ExercisePanel.tsx    (exercise instructions \+ validation)  
│   └── MarkdownContent.tsx  (lesson content renderer)  
└── lib/  
    ├── types.ts             ✅ (data models)  
    ├── progress.ts          ✅ (localStorage progress tracking)  
    └── curriculum.ts        (all course data \- 4 tracks)

### **Data Model (already created in types.ts)**

* **Track**: top-level learning path (e.g. "HTML & CSS Foundations")  
* **Module**: group of related lessons within a track  
* **Lesson**: individual learning unit with content \+ exercises  
* **Exercise**: hands-on coding challenge with starter code, solution, hints  
* **UserProgress**: tracks completed lessons/exercises, XP, streak

### **Curriculum (4 Tracks)**

1. **HTML & CSS Foundations** (beginner)  
   * Module: Semantic HTML (2 lessons with exercises)  
   * Module: CSS Layout & Flexbox (2 lessons with exercises)  
2. **JavaScript for Designers** (beginner)  
   * Module: JS Fundamentals (2 lessons)  
   * Module: DOM Manipulation (2 lessons)  
3. **React & Component Thinking** (intermediate)  
   * Module: React Basics (2 lessons)  
   * Module: State & Props (2 lessons)  
4. **Animation & Interaction** (intermediate)  
   * Module: CSS Transitions & Animations (2 lessons)  
   * Module: Interactive UI Patterns (2 lessons)

Each lesson includes 1-2 exercises with starter code and solutions.

### **Key Interactive Features**

1. **Code Editor**: textarea with monospace font, syntax-aware tab handling, line numbers  
2. **Live Preview**: sandboxed iframe that renders HTML/CSS/JS in real-time as user types  
3. **Exercise Validation**: user clicks "Check" to compare output; visual success/fail feedback  
4. **Progress Tracking**: lessons marked complete, XP awarded, streak tracking, all via localStorage

### **Pages**

1. **Landing Page** (`/`): Hero with gradient text, value props, featured tracks, CTA  
2. **Tracks Page** (`/tracks`): Grid of all learning tracks with progress indicators  
3. **Track Detail** (`/tracks/[trackId]`): Track overview, modules accordion, lesson list with completion status  
4. **Lesson Page** (`/tracks/[trackId]/[lessonId]`): Split view \- lesson content left, code editor \+ preview right  
5. **Playground** (`/playground`): Full-screen code editor \+ live preview for free experimentation

### **Design System**

* Dark theme (zinc/black backgrounds)  
* Purple accent gradient (`#7c3aed` \-\> `#a78bfa` \-\> `#38bdf8`)  
* Geist Sans \+ Geist Mono fonts  
* Subtle grid background pattern  
* Smooth animations (fade-in-up on page load)  
* Cards with hover glow effects

## **Implementation Order**

1. Create `src/lib/curriculum.ts` \- all course content data  
2. Create shared components: Navigation, Footer, TrackCard, ProgressBar, CodeEditor, LivePreview, ExercisePanel  
3. Update `src/app/layout.tsx` \- metadata, navigation wrapper  
4. Build landing page (`src/app/page.tsx`)  
5. Build tracks listing page (`src/app/tracks/page.tsx`)  
6. Build track detail page (`src/app/tracks/[trackId]/page.tsx`)  
7. Build lesson page with code editor (`src/app/tracks/[trackId]/[lessonId]/page.tsx`)  
8. Build playground page (`src/app/playground/page.tsx`)  
9. Test build, fix any issues, commit and push

## **Verification**

1. `npm run build` \- ensure clean production build  
2. `npm run dev` \- verify all pages render correctly  
3. Test navigation between all pages  
4. Test code editor \+ live preview works  
5. Test exercise completion and progress persistence  
6. Verify responsive design at mobile/tablet/desktop

