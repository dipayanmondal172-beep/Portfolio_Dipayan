# Dipayan Mondal: portfolio

Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS. Every page is static, so it is fast and free to host on Vercel.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build; run this before deploying to catch errors
```

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository. Vercel detects Next.js; keep the defaults.
3. Click **Deploy**. Your site goes live at `your-project.vercel.app`.
4. Optional: add a custom domain under **Project → Settings → Domains**. Then add the environment variable
   `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy, so social previews and the sitemap use that domain.

## Updating content

Almost everything lives in **`content/site.ts`**: text, metrics, links, case studies, skills, certifications.
Edit it, save, and redeploy (pushing to GitHub redeploys automatically).

| To change… | Do this |
|---|---|
| Your resume | Replace `public/resume/Dipayan_Mondal_Resume.pdf` (keep the filename, or update `profile.resume`). |
| Neutrinos dates after you leave | In `experience`, change `dates: "2024 – Present"` to `"2024 – January 2027"`. Also update `jobTitle` / `worksFor` in `app/layout.tsx`. |
| Add a photo | Save it as `public/images/portrait.webp` (about 960×1200) and set `profile.portrait: "/images/portrait.webp"`. |
| Add Instagram or phone | Set `profile.instagram` or `profile.phone`. Both are hidden while `null`. |
| Hide CGPAs | Set `education.showGrades: false`. |
| Add an award | Add an entry to `awards`. The block appears automatically once it has one. |
| Add a certificate image | Put the file in `public/certificates/` and set that certification’s `image` to `"/certificates/file.webp"`. |
| BlueBridge dates | Set `dates` on the BlueBridge entry, e.g. `"2025 – Present"`. |
| Add a case study image | Put it in `public/images/<case>/` and add it to that case study’s `gallery` block with its width and height. |
| Colours or fonts | `tailwind.config.ts` holds the palette; fonts are set in `app/layout.tsx` and `tailwind.config.ts`. |

Case-study pages are generated from the `caseStudies` array: add an entry with a new `slug` and it gets its own page at `/work/<slug>`.

## Themes and animation

- **Light and dark.** The site follows the visitor’s system setting, and the toggle in the header overrides it (remembered per browser). Palette values for both themes live at the top of `app/globals.css`.
- **Animations** live in `components/diagrams.tsx` (hero system and one diagram per case study) and `components/motion.tsx` (scroll reveals, count-up numbers, headline word rise). They use only CSS and SVG, so there’s no animation library to update.
- **Lower-half effects** (work card stack, contact network, magnetic buttons) live in `lib/fx.js`, plain JavaScript with no dependencies. Skills marquee and explorer are in `components/fx.tsx`; marquee words are set at the top of `app/page.tsx` (`marqueeA`, `marqueeB`).
- **Experience diagrams.** Each role lists the diagrams to show beside it in `visuals` (in `content/site.ts`). More than one becomes a switcher that advances every 8 seconds; change `interval` on `RoleVisual` in `components/diagrams.tsx`.
- **Work stack evidence** comes from each case study’s `cover` image; analyst relations shows the placements instead (`components/Evidence.tsx`).
- **Reduced motion.** Visitors who turn on “reduce motion” in their operating system see every diagram in its finished state with nothing moving.
- To change a diagram label, edit the text inside the matching function in `components/diagrams.tsx` (for example `HeroSystem` or `BlueBridgeFlow`).

## Confidentiality

The enablement previews in `public/images/enablement/` are deliberately blurred. Do not replace them with readable versions while the material is confidential. The Everest Group and Celent charts are intentionally not included; the site links to Neutrinos’ public press releases instead.
