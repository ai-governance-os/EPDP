# EPDP

EPDP is the first working prototype for an education planning and school operations dashboard. This repository now contains a modern `Next.js` foundation that we can extend step by step into a full school management platform.

## Current scope

- Responsive login page with role-based demo access
- Session-based dashboard flow using secure cookies
- Shared admin shell with navigation for core modules
- SQLite database with Prisma ORM and seed data
- Dashboard, teacher, student and RPH pages backed by database reads
- DSKP selection module with sample SJKC subject-to-textbook mappings
- RPH page can receive a selected DSKP topic and display mapped standards
- Summary cards, workflow blocks and phased product roadmap

## Tech stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Prisma`
- `SQLite`

## Run locally

```bash
npm install
npm run prisma:generate
npm run db:push
npm run db:seed
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Create a `.env` file from `.env.example` if you are setting up the project on a new machine.

## Verified commands

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
npm run lint
npm run build
```

## Planned next steps

1. Replace demo session flow with a real authentication provider.
2. Add create, edit and approval flows for RPH.
3. Expand DSKP coverage to more subjects, years and official mappings.
4. Save selected DSKP standards directly into new RPH records.
5. Build CRUD forms for teachers and students.

## Notes

- The current DSKP module ships with starter sample mappings for SJKC subjects so the selection workflow can be tested end to end.
