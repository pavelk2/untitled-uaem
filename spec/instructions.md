**Instructions**  

• Follow these instructions exactly  
• Do not deviate unless explicitly told to do so  
• Ask questions if anything is unclear  

**Critical Rules**  

• Never change architecture, folder structure, or core stack unless explicitly told  
• Never introduce new major dependencies without explicit approval  
• Never remove or significantly refactor existing code unless directly required  
• Never break or remove existing functionality unless explicitly instructed  

**General Approach**  

• Make changes minimal, precise, and focused  
• Only modify what is necessary to fulfill the exact requirement  
• Do not invent or add unrequested features or requirements  
• Always prefer the simplest solution that works correctly  

**Reuse and Modularity**  

• Always follow the single-responsibility principle  
• Reuse existing components, hooks, utilities, patterns, and conventions whenever possible  
• If any file mixes unrelated concerns, extract parts into new dedicated files  
• Create utils for complex calculations, data transformations, or formatting logic  
• Smaller, focused files are preferred for readability, testability, and maintainability  
• Only create new code when existing code cannot fulfill the task  
• Keep new code isolated and modular — easy to adjust or remove later  

**Testing and Cleanup**  

• Make every change immediately testable (use mocks if real data unavailable)  
• Clean up dead code, unused imports, and temporary comments after changes  
• After refactoring, verify related areas remain stable and integrated  
• Make sure that everything continues to work as intended and nothing breaks  

**Security and User Guidance**  

• Handle secrets and keys securely — never expose them in frontend code  
• If user action is required (eg connecting a service), provide clear step-by-step instructions  
• When a new dependency is truly needed, explain why and ask for explicit permission before installing  
• Never install dependencies without approval  

**Architecture and Logic**  

• Keep core business logic and sensitive operations on the backend  
• Keep backend code small, focused, and easy to understand/debug  
• Maintain strict separation of concerns (UI, business logic, state, services)  

**Documentation and Communication**  

• Add or update comments only where they clarify non•obvious logic  
• Clearly explain what was built, why, and how to test it  
• If anything is unclear or missing, ask for clarification before proceeding  
