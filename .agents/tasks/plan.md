# LilGenius — Implementation Plan

## Project State (as of planning)

**Stack confirmed:**
- Next.js 16.4.5 (App Router, React 19, Turbopack)
- TypeScript 5 (strict mode, `@/*` alias → `src/*`)
- Tailwind CSS 4.3.4 (CSS-first, `@theme` blocks in `globals.css` — **no `tailwind.config.ts`**)
- Framer Motion 14.9.1
- Lucide React 1.68.0
- All `node_modules` installed, directories scaffolded, zero source files written

**Key Next.js 16 requirement:** `params` and `searchParams` are `Promise<T>` and must be `await`ed in all page/layout components.

**Key Tailwind v4 requirement:** All custom colors and fonts go inside a `@theme {}` block in `src/app/globals.css` as CSS custom properties (e.g., `--color-primary: #7656E8;`). These generate utility classes like `bg-primary`, `text-primary` automatically. There is no `tailwind.config.ts`.

**Build commands:**
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`
- Dev server: `npm run dev`

---

## Implementation Plan

This plan is decomposed into 5 FEATs (see `.agents/tasks/task-lilgenius-complete/features/`). Each FEAT leaves the codebase in a buildable, deployable state.

---

- [ ] **FEAT-001 — Foundation** (no dependencies)
      Set up the entire shared infrastructure: Tailwind v4 theme, fonts, TypeScript interfaces, i18n, localStorage abstraction, repository layer, custom hooks, all base UI primitives (Button, Card, Badge, ProgressBar, Modal, Avatar, Spinner, LoadingState, EmptyState, ErrorState), inline SVG mascot characters, Navbar, Footer, root layout, and locale layout.
      
      **Files to create/modify:**
      - `src/app/globals.css` — replace entirely with `@theme` block for all brand colors and fonts
      - `src/app/layout.tsx` — replace Geist fonts with Fredoka + Nunito via `next/font/google`
      - `src/app/page.tsx` — replace boilerplate with `redirect('/en')`
      - `src/types/index.ts` — all 18 interfaces/types
      - `src/config/constants.ts` — levels, points config, storage keys, app constants
      - `src/content/translations/en.ts` — all English strings
      - `src/content/translations/fr.ts` — all French strings
      - `src/lib/i18n/index.ts` — `getTranslations()`, `t()`, locale helpers
      - `src/lib/storage/index.ts` — `StorageService` class (localStorage abstraction)
      - `src/lib/repositories/profile.repository.ts` — profile CRUD
      - `src/lib/repositories/progress.repository.ts` — progress CRUD + helpers
      - `src/lib/utils/cn.ts` — class name merger
      - `src/lib/utils/date.ts` — date utilities, streak helpers, daily challenge seeding
      - `src/hooks/useProfile.ts`, `useProgress.ts`, `useTranslations.ts`
      - `src/components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `ProgressBar.tsx`, `Modal.tsx`, `Avatar.tsx`, `Spinner.tsx`, `LoadingState.tsx`, `EmptyState.tsx`, `ErrorState.tsx`
      - `src/components/characters/MascotSVG.tsx` — inline SVG ExplorerMascot, ScientistMascot, ArtistMascot, LilGeniusLogo
      - `src/components/layout/Navbar.tsx`, `Footer.tsx`
      - `src/app/[locale]/layout.tsx` — locale shell with Navbar + Footer
      - `src/app/[locale]/page.tsx` — placeholder landing (replaced in FEAT-002)
      
      **Verify:** `npx tsc --noEmit` → 0 errors; `npm run build` → success

---

- [ ] **FEAT-002 — All Pages** (depends on FEAT-001)
      Build every page and route in the application. Pages import from content files with safe fallbacks (content files are created in FEAT-003, but pages must handle missing data gracefully).
      
      **Files to create:**
      - `src/components/landing/HeroSection.tsx`, `SubjectPreviewSection.tsx`, `HowItWorksSection.tsx`, `FeaturedActivitiesSection.tsx`, `BenefitsSection.tsx`, `CTASection.tsx`
      - `src/app/[locale]/page.tsx` — full landing page (replaces FEAT-001 placeholder)
      - `src/components/onboarding/OnboardingWizard.tsx` (7-step wizard)
      - `src/app/[locale]/onboarding/page.tsx`
      - `src/components/dashboard/DashboardGreeting.tsx`, `DailyGoalRing.tsx`, `ContinueLearning.tsx`, `SubjectGrid.tsx`, `DailyChallengeBanner.tsx`, `AchievementsPreview.tsx`, `RecommendationsWidget.tsx`
      - `src/app/[locale]/dashboard/page.tsx`
      - `src/components/subjects/SubjectCard.tsx`
      - `src/app/[locale]/subjects/page.tsx`
      - `src/app/[locale]/subjects/[subjectId]/page.tsx`
      - `src/components/lessons/LessonViewer.tsx`, `LessonCard.tsx`
      - `src/app/[locale]/subjects/[subjectId]/lessons/[lessonId]/page.tsx`
      - `src/components/quizzes/QuizEngine.tsx`, `MultipleChoiceQuestion.tsx`, `TrueFalseQuestion.tsx`, `FillInBlankQuestion.tsx`, `MatchingPairsQuestion.tsx`
      - `src/app/[locale]/subjects/[subjectId]/lessons/[lessonId]/quiz/page.tsx`
      - `src/components/achievements/AchievementsPage.tsx`, `AchievementBadge.tsx`, `CelebrationAnimation.tsx`
      - `src/app/[locale]/achievements/page.tsx`
      - `src/components/profile/ProfilePage.tsx`
      - `src/app/[locale]/profile/page.tsx`
      - `src/app/[locale]/explore/page.tsx`
      - `src/components/challenges/DailyChallengesPage.tsx`
      - `src/app/[locale]/challenges/page.tsx`
      - `src/app/[locale]/about/page.tsx`, `parents/page.tsx`, `teachers/page.tsx`
      - `src/app/[locale]/login/page.tsx`, `register/page.tsx`
      - `src/components/shared/PageTransition.tsx`, `SubjectIcon.tsx`
      - `src/app/not-found.tsx`, `src/app/[locale]/not-found.tsx`
      
      **Verify:** `npx tsc --noEmit` → 0 errors; `npm run build` → success

---

- [ ] **FEAT-003 — Educational Content** (independent of FEAT-002, depends on FEAT-001 for types)
      Author all subject content and quiz questions as TypeScript files conforming exactly to the interfaces from `src/types/index.ts`.
      
      **Files to create:**
      - `src/content/subjects/mathematics.ts` — 5 lessons, 50 questions
      - `src/content/subjects/science.ts` — 5 lessons, 50 questions
      - `src/content/subjects/geography.ts` — 5 lessons, 50 questions (DRC focus)
      - `src/content/subjects/history.ts` — 3 lessons, 24 questions (African history)
      - `src/content/subjects/languages.ts` — 3 lessons, 24 questions
      - `src/content/subjects/general-knowledge.ts` — 1 lesson, 20 questions
      - `src/content/subjects/logic.ts` — 2 lessons, 20 questions
      - `src/content/subjects/programming.ts` — 2 lessons, 20 questions
      - `src/content/subjects/index.ts` — `allSubjects[]` + helper functions
      - `src/content/challenges/daily-challenges.ts` — 14 daily challenges
      
      **Verify:** `npx tsc --noEmit` → 0 errors; `npm run build` → success

---

- [ ] **FEAT-004 — Gamification** (depends on FEAT-001, FEAT-003)
      XP + level system, 12 achievement badges with unlock logic, streak tracking, daily challenge rotation, character unlock system, quiz engine logic class, and wiring gamification into existing UI.
      
      **Files to create:**
      - `src/features/gamification/levels.ts` — 6 levels, XP helpers
      - `src/features/gamification/achievements.ts` — 12 achievements, unlock checker
      - `src/features/gamification/streak.ts` — streak update logic
      - `src/features/gamification/points.ts` — points calculation functions
      - `src/features/gamification/characters.ts` — character options, unlock conditions
      - `src/features/gamification/index.ts` — `processLessonCompletion()`
      - `src/features/quizzes/quiz-engine.ts` — `QuizEngine` class
      - `src/lib/repositories/game-state.repository.ts`
      - `src/hooks/useGamification.ts`
      
      **Files to update:**
      - `src/components/achievements/AchievementsPage.tsx` — wire real achievement data
      - `src/components/dashboard/DashboardGreeting.tsx` — wire level + streak
      - `src/components/dashboard/DailyGoalRing.tsx` — wire real progress
      - `src/components/quizzes/QuizEngine.tsx` — use QuizEngine class, trigger celebrations
      - `src/components/profile/ProfilePage.tsx` — character lock/unlock
      - `src/components/challenges/DailyChallengesPage.tsx` — wire real challenge data
      
      **Verify:** `npx tsc --noEmit` → 0 errors; `npm run build` → success

---

- [ ] **FEAT-005 — Polish & Documentation** (depends on FEAT-001 through FEAT-004)
      Navigation audit, full animation pass, accessibility fixes, responsive layout audit, loading/empty states, final TypeScript and ESLint cleanup, project documentation.
      
      **Files to create/modify:**
      - `src/lib/utils/routes.ts` — route builder helpers
      - `src/hooks/useReducedMotion.ts` — reduced motion hook
      - All component files requiring animation/accessibility fixes (audit and fix in-place)
      - `README.md` — overwrite with LilGenius-specific setup/deployment docs
      - `ARCHITECTURE.md` — create new, Supabase integration path
      - `FEATURES.md` — create new, completed vs future features
      
      **Verify:** `npx tsc --noEmit` → 0 errors; `npm run build` → success; `npm run lint` → 0 errors

---

## Critical Implementation Notes

### Tailwind v4 CSS-first configuration
Colors are defined in `globals.css` inside a `@theme {}` block:
```css
@theme {
  --color-primary: #7656E8;
  --color-blue: #4395F5;
  --font-heading: 'Fredoka', sans-serif;
  --font-body: 'Nunito', sans-serif;
}
```
Use as: `bg-primary`, `text-blue`, `font-heading`. Do NOT create `tailwind.config.ts`.

### Next.js 16 async params
Every page and layout that receives `params` must use the async pattern:
```tsx
export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
}
```

### Framer Motion must be in Client Components
```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
```

### localStorage safety
```tsx
// Always guard:
if (typeof window !== 'undefined') {
  localStorage.setItem(key, value);
}
```

### No emojis — Lucide icons only
Every visual indicator must use a Lucide React icon component, never a Unicode emoji character.

### Repository pattern for future Supabase migration
All data access flows through `src/lib/repositories/`. Pages and components never call `localStorage` directly — they use the repository classes, which internally call `StorageService`. When Supabase is added, only the repository implementations change.
