# LearnFlow — Student Learning Dashboard

🚀 **Live Demo:** https://your-app.vercel.app
🔗 **GitHub:** https://github.com/jamiabdul112/internship-assignment

A high-fidelity student dashboard built with Next.js, Supabase, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 15** (App Router)
- **Supabase** (PostgreSQL database)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Getting Started

1. Clone the repository
```bash
   git clone https://github.com/your-username/learnflow-dashboard
   cd learnflow-dashboard
```

2. Install dependencies
```bash
   npm install
```

3. Set up environment variables
```bash
   cp .env.example .env.local
```
   Fill in your Supabase URL and secret key.

4. Run the development server
```bash
   npm run dev
```

## Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
create table public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null check (progress between 0 and 100),
  icon_name   text not null,
  created_at  timestamptz default now()
);

alter table public.courses enable row level security;

create policy "public can read courses"
  on public.courses for select
  to anon, authenticated
  using (true);

grant usage on schema public to anon, authenticated, service_role;
grant select on public.courses to anon, authenticated, service_role;
```

## Architecture

### Server / Client Component Split

- **`app/dashboard/page.tsx`** is a Server Component. It fetches courses
  directly from Supabase on the server using the secret key — no API route
  needed, no data exposed to the client.

- **`components/CourseGrid.tsx`, `CourseTile.tsx`, `HeroTile.tsx`** etc. are
  Client Components (`"use client"`) because they use Framer Motion animations
  and React hooks.

- **`lib/supabase.ts`** uses `SUPABASE_SECRET_KEY` (no `NEXT_PUBLIC_` prefix)
  so it is never bundled or sent to the browser.

### Data Flow

Supabase DB
↓  (server-side, secret key)
getCourses() — lib/getCourses.ts
↓
Courses() async Server Component — dashboard/page.tsx
↓  (passes data as props)
CourseGrid → CourseTile (client, animated)

### Loading States

React `<Suspense>` wraps the `Courses` server component. While the database
fetch is in progress, `CourseSkeletons` renders pulsing placeholder tiles.
The `app/dashboard/loading.tsx` file handles the full-page skeleton for the
initial route load.

### Animations

All animations use Framer Motion with spring physics
(`type: "spring", stiffness: 300, damping: 20`) to avoid linear easing.
Course tiles stagger in sequentially using `delay: i * 0.08`.
The sidebar navigation uses `layoutId="active-pill"` for a smooth sliding
highlight when switching nav items.

### Responsive Design

- **Desktop (> 768px)**: Full sidebar + 2-column bento grid
- **Mobile (< 768px)**: Fixed bottom navigation bar + single column grid

## Challenges

**Supabase new key format**: Newer Supabase projects issue `sb_publishable_`
and `sb_secret_` keys instead of the classic JWT `anon` key. The `@supabase/ssr`
package does not fully support this format yet, so I used `@supabase/supabase-js`
directly with the secret key in a server-only module.

**Hydration mismatch**: The activity contribution graph initially used
`Math.random()` which produced different values on the server vs client,
causing a React hydration error. Fixed by using a static seed array so both
server and client render identical HTML.

**Progress bar animation**: Using `useMotionValue` with `.get()` directly in
the `style` prop doesn't react to spring updates. Fixed by using
`useTransform` to derive a reactive `width` value that Framer Motion tracks
properly.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SECRET_KEY` | Supabase secret key (server-only, never exposed to browser) |
