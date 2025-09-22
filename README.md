# HPCSA Mobile App (Next.js + Tailwind)

A prototype mobile-style web app built with Next.js 14 (pages router) and Tailwind CSS.

## Quick start

```bash
# 1) Install Node LTS (>=18.x recommended)
# 2) Install dependencies
npm i

# 3) Run in dev
npm run dev

# 4) Build a static export (outputs to ./out)
npm run build

# 5) Preview the static export locally (optional)
npx serve out
```

> This project uses `output: 'export'` in `next.config.js`, so `npm run build` will produce a static site in the `out/` folder.

## Test logins

- **Active Practitioner:** `MP0345678` / `TestPass123`
- **Overdue Account:** `MP0567891` / `TestPass456`
- **Dental Practitioner:** `DP0234567` / `TestPass789`
- **Psychologist:** `PS0345678` / `TestPass321`
- **Admin User:** `ADMIN001` / `AdminTest123`

## Deploy

### Vercel
- Connect the repo to Vercel
- Build Command: `npm run build`
- Output Directory: `out`
- No server functions are used; this is fully static.

### Netlify / GitHub Pages / Any static host
- Build: `npm run build`
- Deploy the contents of the `out/` folder

## Notes
- Some Tailwind utility tweaks were applied (e.g., `min-w-[4rem]`, `w-[7.5rem]`) to ensure correct sizing with the default Tailwind scale.
- The `start` script is unused for static export, but kept for local SSR runs if you switch away from export mode.
