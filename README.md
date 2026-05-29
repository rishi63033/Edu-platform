# EduPlatform — High-Fidelity Student Dashboard

A premium, interactive student dashboard prototype built with Next.js 15, Supabase, and Framer Motion. This platform features a responsive Bento-style layout, real-time data integration, and professional-grade animations.

## 🚀 Features

- **Responsive Bento Grid**: Dynamic layout adapting to Desktop (3-cols), Tablet (2-cols), and Mobile (1-col).
- **Premium Interaction**: Physics-based hover effects, staggered entrance animations, and snappy navigation highlights.
- **Dynamic Backgrounds**: Abstract gradient meshes and grain textures for a high-end visual feel.
- **Supabase Integrated**: Real-time course tracking with animated progress indicators.
- **Multi-device Navigation**: Adaptive sidebar for Desktop/Tablet and a sleek bottom bar for Mobile.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Database Setup
Create a `courses` table in your Supabase SQL editor:

```sql
CREATE TABLE courses (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  progress   INTEGER NOT NULL DEFAULT 0,
  icon_name  TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed initial data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Deep Dive', 42, 'FileType'),
  ('System Design Fundamentals', 60, 'Layers'),
  ('CSS Architecture & Animations', 88, 'Paintbrush');
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Installation & Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🏛️ Architecture & Decisions

### Server/Client Component Split
To maximize performance and security, I implemented a strict split between Server and Client components:
- **Server Components (RSC)**: `page.tsx` and `CoursesSection.tsx`. These handle data fetching directly from Supabase. By doing this on the server, the database API keys are never exposed to the client, and the initial page load is faster.
- **Client Components**: UI elements like the `Sidebar`, `BentoGrid`, and `CourseCard`. These use "use client" as they require browser-only features like Framer Motion for animations and `useState` for interactive states.

### Challenges Faced
1. **Async Staggering**: One challenge was staggering the entrance animation of courses that load asynchronously. I solved this by creating a `CourseListWrapper` that triggers a staggered entrance only after the data is successfully fetched and rendered.
2. **Responsive Sidebar**: Balancing a manual toggle with a fixed responsive breakpoint (tablet collapse) required careful use of `window` listeners and Framer Motion's external `animate` controls.
3. **Dynamic Icon Resolution**: Since icon names are stored in the database as strings, I implemented a dynamic lookup system using `lucide-react` types to ensure icons render correctly without hardcoding them into the UI.

---
*Developed with a focus on high-fidelity interaction and architectural best practices.*
