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