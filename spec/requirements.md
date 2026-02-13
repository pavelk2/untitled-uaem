# Ticket 1: Move to Building to start your project

# Agent Instructions  

• Create the initial project setup based on the project description and specifications provided below.  
• Install the necessary libraries and dependencies and make sure that the app runs smoothly with a base minimum setup.  
• Make sure the target architecture is in place but avoid adding boilerplace that it not needed for a base minimum setup.  
• Make sure the essential product components are represented in line with the specified design preferences.  
• If the bare minimum setup requires data, use dummy data from a single file that can be easily modified and removed later.  
• Do not use any external services and make sure no user actions are required, except for approving coding agent actions.  

---

## Project Description

This product is an alternative to Typeform that leverages AI to create visually appealing forms and funnels, similar to TimeTuna.com. It is designed for founders and marketing experts who need to build various funnels for registrations, sales, call bookings, and insights collection. Users can create customized forms that enhance user engagement and streamline data collection, ultimately improving conversion rates and providing valuable insights into customer behavior.

- AI-driven form creation
- Beautiful design inspired by TimeTuna.com
- Funnels for registrations, sales, and call bookings
- Insights collection for data-driven decisions
- Targeted at founders and marketing experts
- Customizable forms to enhance user engagement
- Streamlined data collection process
- Improved conversion rates through effective funnels
- User-friendly interface for form building

---

## Implementation Instructions

**Core Stack**  

• Frontend framework: React 18+ with Nextjs  
• Language: TypeScript  
• State management: Redux Toolkit  
• Styling: Tailwind CSS  
• Backend: Supabase  
    • Database: Supabase Postgres  
    • Authentication: Supabase Auth  
    • Storage: Supabase Storage  
    • Edge Functions: Supabase Edge Functions  

**Project and Folder Structure**  

Follow this structure exactly. Do not invent new top•level folders.  

src/  
• assets/       static images, icons, fonts (no code)  
• components/   small, stateless, reusable UI pieces  
    • Button/  
    • Card/  
    • Modal/  
    • ... (one folder per component)  
• modules/      larger, stateful sections of the app (pages + logic)  
    • Dashboard/  
    • Projects/  
    • Settings/  
    • Auth/  
• services/     external service wrappers and configuration  
    • supabase.js  
    • stripe.js  
• store/        Redux store and slices  
    • index.ts    configureStore  
    • slices/  
        • authSlice.ts  
        • globalSlice.ts  
        • ... (one slice per feature)  
• utils/        pure functions, helpers, formatters  
    • date.ts  
    • validators.ts  
    • constants.ts  
• App.tsx  
• main.tsx  

Rules:  
• No files directly in src/ except App.tsx and main.tsx  
• Components are dumb UI with no Redux or side effects  
• Modules are smart pages or features that can use Redux, hooks, services  
• Services contain only configuration and API wrappers with no business logic  

**Naming and Coding Conventions**  

• Files and folders: kebab-case for folders (project-list)  
• Components: PascalCase (ProjectCard.tsx)  
• CSS classes: Tailwind utility classes only  
• Variables: camelCase (projectTitle)  
• Constants: UPPER_SNAKE_CASE (MAX_PROJECTS_FREE)  
• Functions: camelCase (fetchProjects, createTicket)  
• Types and Interfaces: PascalCase (Project, TicketPayload)  
• No default exports – always named exports  
• Prefer named imports over default imports  

**State Management Rules**  

• Global state: Redux Toolkit slices only  
• Local component state: useState or useReducer  
• Never use Context API for global state  
• Slices must be feature•based (auth, projects, ui, etc.)  

**Supabase Rules and Patterns**  

• Use Supabase client v2 (modular)  
• Initialize once in services/supabase.ts  
• Use named exports for auth, database, storage, functions  
• Never expose service role keys in frontend  
• Use Row Level Security – users can only read and write their own data  
• Use Edge Functions for:  
    • Stripe webhooks  
    • Monthly usage resets  
    • Sensitive operations  

**Security and Environment**  

• No API keys in frontend code  
• Use Vite environment variables (VITE_...) for public values  
• Use Edge Functions to proxy private keys and sensitive calls  
• Supabase Auth required for all authenticated routes  
• Row Level Security: lock down tables (users can only access own rows)  

**Build and Deployment**  

• Development: npm run dev – Vite dev server  
• Production build: npm run build – outputs to dist/  
• Hosting: Vercel, Netlify, or Supabase Hosting  
• Ignore files: Add to .gitignore  
    • notes.md  
    • *.md  
    • .env  
    • .env.local  

**Project Goals and Non-Negotiables**  

• Scalable to hundreds of users  
• Secure with no key leakage and proper authentication  
• Maintainable with strict folder structure and separation of concerns  
• Fast user experience with optimistic updates where possible  
• Use TypeScript everywhere with strict mode  
• Write clean, readable code

---

## Design Instructions

**Core Design Principles**  

I want to make sure that Jony Ive would be impressed with my design. I want to make sure that the design of this app is as good or even better and more impressive than Red Award projects, top Behance projects, and Dribbble designs. I want to utilise the latest Apple Liquid glass as much as possible.

• Use 8-point grid for all layouts and spacing  
• Use 4-point grid for text line-height, icon sizes, and small visual elements  
• Build fully responsive designs that work perfectly on mobile, tablet, and desktop  
• Maintain strict consistency in style, spacing, typography, and interaction patterns  
• Use standardized colors and fonts across the entire application  
• Prioritize accessibility (WCAG 2.1 AA minimum)  
• Aim for aesthetically pleasing and beautiful interfaces  
• Follow common, proven, modern design patterns – do not invent new ones  
• Default to light mode – only use dark mode when the user explicitly requests it  
• Choose complementary colors that look and work great together  
• Use clear, distinct colors for interactive states (hover, active, focus, disabled, error, success)  

**Layout and Spacing**  

• Align everything to an 8-point grid (multiples of 8 px: 8, 16, 24, 32, 40, 48, etc.)  
• Use 4-point increments (4, 8, 12, 16, etc.) for fine adjustments  
• Maintain consistent padding and margins throughout  
• Use CSS Grid for page layouts – avoid Flexbox for main structure  

**Typography**  

• Choose one modern, highly legible font family (e.g. Inter, Poppins, System sans-serif stack)  
• Set base font size 16 px (1 rem)  
• Use a clear type scale (12, 14, 16, 20, 24, 32, 40 px)  
• Maintain proper line•height (1.4–1.6) and letter•spacing  

**Colors**  

• Define a limited, harmonious palette (primary, secondary, accent, neutral grays, success/error/info)  
• Use high contrast ratios (minimum 4.5:1 for text)  
• Define semantic colors for states: default, hover, active, focus, disabled, success, error, warning, info  
• Avoid pure black (#000) or pure white (#FFF) – use off-black/off-white  

**Accessibility**  

• All interactive elements must have visible focus styles  
• Use semantic HTML inside common components (button, nav, main, etc.)  
• Add aria-labels and roles where needed  
• Support full keyboard navigation  

**Interaction and User Experience**  

• Use standard, familiar patterns (cards, modals, tabs, drawers)  
• Add subtle hover and active states  
• Provide clear visual feedback for all actions  
• Support loading states, skeletons, and error messages  
• Keep animations minimal and purposeful (no excessive motion)  
• Respect user’s reduced motion preference (prefers•reduced•motion media query)  

**Dark Mode**  

• Light mode is the default  
• Only implement dark mode if the user explicitly enables it  
• Use a proper dark theme with good contrast and no eye strain