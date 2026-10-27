# Instructions for Antigravity

You are helping implement **QuickKart**, a student quick-commerce project inspired by the Blinkit business model. Read `PLAN.md` before coding.

## Working rules
- Follow the phase order in `PLAN.md`. Start with the immediate next task only.
- The student needs to understand the code for a viva. Prefer clear, explicit, beginner-readable code over clever abstractions.
- Use React + Vite for the frontend and Node.js + Express for the backend.
- Use JavaScript and JSX, not TypeScript, unless the student explicitly requests a migration.
- Keep frontend code in `client/` and backend code in `server/`.
- Use Fetch API for initial client-server integration.
- Do not introduce a database, payment gateway, authentication, live tracking, or AI features until the MVP is working and the plan is updated.
- Do not make every syllabus topic artificially part of the production app. Teach concepts with small isolated examples when that is more appropriate.
- Use original QuickKart branding. Do not copy Blinkit's logo, exact visual identity, or proprietary assets.
- Never invent test results. Run relevant checks and state exactly what passed or failed.
- Before changing existing code, inspect it and preserve working behavior.
- Avoid unrelated rewrites, unnecessary dependencies, and premature optimization.
- Never commit secrets. Keep `.env` files out of Git and provide `.env.example` files when needed.

## Required workflow for each task
1. State the phase and goal briefly.
2. Inspect relevant files before editing.
3. Implement one small, complete task.
4. Run available lint/build/tests or a manual smoke test.
5. Summarize:
   - files created/changed,
   - what the feature does,
   - commands/tests run and their actual results,
   - known limitations,
   - next task from `PLAN.md`.
6. Stop at the phase boundary and wait for the student's review before starting the next phase.

## Code quality
- Use semantic HTML, accessible labels, useful alt text, and keyboard-visible focus.
- Handle loading, empty, validation, and error states where relevant.
- Use consistent naming and formatting.
- Validate all untrusted API input on the server.
- Calculate order prices/totals on the server using trusted product data, never client-submitted totals.
- Use appropriate HTTP status codes and centralized Express error handling.
- Do not use direct DOM manipulation for ordinary React state-driven UI.
- Document the purpose of important concepts in concise comments or `docs/VIVA_NOTES.md` where useful.
