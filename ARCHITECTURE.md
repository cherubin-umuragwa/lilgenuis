# LilGenius — Architecture

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   └── [locale]/           # Locale-scoped routes (en, fr)
│       ├── page.tsx        # Landing page
│       ├── dashboard/
│       ├── subjects/
│       ├── achievements/
│       ├── challenges/
│       ├── explore/
│       ├── onboarding/
│       ├── profile/
│       └── ...
├── components/             # Reusable UI components
│   ├── achievements/
│   ├── characters/
│   ├── dashboard/
│   ├── landing/
│   ├── layout/             # Navbar, Footer
│   ├── quizzes/
│   ├── shared/
│   └── ui/                 # EmptyState, LoadingState, Button, etc.
├── content/                # Static educational content
│   ├── subjects/           # Subject definitions + lesson data
│   ├── challenges/         # Daily challenge definitions
│   └── translations/       # EN / FR string maps
├── features/               # Domain logic (pure functions, no side-effects)
│   └── gamification/       # XP, levels, achievements, streak, characters
├── hooks/                  # React hooks (data access layer)
│   ├── useProfile.ts
│   ├── useProgress.ts
│   ├── useGamification.ts
│   └── useTranslations.ts
├── lib/
│   ├── i18n/               # Locale validation helpers
│   ├── repositories/       # Data access objects (read/write localStorage)
│   ├── storage/            # StorageService abstraction
│   └── utils/              # cn, date helpers, ROUTES
└── types/                  # Shared TypeScript types
```

## Repository Pattern

Data flows in a single direction:

```
StorageService  →  Repository  →  Hook  →  Component
```

- **StorageService** (`src/lib/storage/index.ts`) — thin wrapper around `localStorage`. Single place to swap the persistence layer.
- **Repositories** (`src/lib/repositories/`) — read/write typed domain objects using StorageService. Three repositories exist: `ProfileRepository`, `ProgressRepository`, `GameStateRepository`.
- **Hooks** (`src/hooks/`) — call repositories, hold React state, expose a clean API to components.
- **Components** — call hooks only; never touch repositories or storage directly.

## How to Swap StorageService for Supabase

1. Create `src/lib/storage/supabase.ts` that implements the same interface as `src/lib/storage/index.ts` but calls Supabase instead of `localStorage`.
2. Replace the import in each repository (`profile.repository.ts`, etc.) — or re-export from a single barrel that can be toggled via an environment variable.
3. Hooks and components stay **unchanged** because they depend only on the repository API.

Example skeleton:

```ts
// src/lib/storage/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const SupabaseStorageService = {
  async get<T>(key: string): Promise<T | null> {
    const { data } = await supabase.from('kv_store').select('value').eq('key', key).single();
    return data?.value ?? null;
  },
  async set<T>(key: string, value: T): Promise<void> {
    await supabase.from('kv_store').upsert({ key, value });
  },
};
```

## Auth Integration Path

1. Install NextAuth.js (`next-auth`) or `@supabase/auth-helpers-nextjs`.
2. Add a `SessionProvider` around `{children}` in `src/app/[locale]/layout.tsx`.
3. Pass `session.user.id` as the profile ID into `ProfileRepository.saveProfile` during onboarding.
4. All subsequent repository calls use that ID as the storage key, scoping data per user.
5. Server-side guard: add `auth()` (NextAuth) or `getSession()` (Supabase) in page server components to redirect unauthenticated users.

## AI Assistant Integration Path

1. Create `src/app/api/ai-hint/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { questionText, subject, locale } = await req.json();
  // Call OpenAI / Gemini / your LLM of choice here
  const hint = await generateHint({ questionText, subject, locale });
  return NextResponse.json({ hint });
}
```

2. In the quiz page, add a "Get a Hint" button that calls `POST /api/ai-hint` with the current question and displays the response.
3. Keep hint fetches client-side (`fetch` from `QuizPageClient.tsx`) to avoid blocking SSR.

## i18n: Adding a Third Language

1. Add the new locale code (e.g. `"sw"`) to `src/types/index.ts` → `Locale` union.
2. Create `src/content/translations/sw.ts` mirroring the structure of `en.ts`.
3. Update `src/lib/i18n/index.ts` to include `"sw"` in the valid-locale list.
4. Update the locale selector in `Navbar` and `Footer` to include the new language.
5. (Optional) Add `sw` to the middleware matcher in `next.config.ts` if locale-based routing is configured at the middleware level.
