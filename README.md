# EPDP

EPDP is the first working prototype for an education planning and school operations dashboard. This repository now contains a modern `Next.js` foundation that we can extend step by step into a full school management platform.

## Current scope

- Responsive login page with role-based demo access
- Session-based dashboard flow using secure cookies
- Shared admin shell with navigation for core modules
- Dashboard, teacher, student and RPH prototype pages
- Summary cards, workflow blocks and phased product roadmap

## Tech stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Verified commands

```bash
npm run lint
npm run build
```

## Planned next steps

1. Replace demo session flow with a real authentication provider.
2. Connect teacher, student and RPH pages to a real database.
3. Add create, edit and approval flows for RPH.
4. Build reporting, PDF export and school settings modules.
5. Add analytics and AI-powered school tools.
