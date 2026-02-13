# FormFunnel

AI-powered form builder and funnel creator. An alternative to Typeform designed for founders and marketing experts who need to build funnels for registrations, sales, call bookings, and insights collection.

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite
- Redux Toolkit
- Tailwind CSS v4
- React Router v7
- Supabase (Auth, Database, Storage)

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
