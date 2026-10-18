# Nasib Asgar — Ph.D. Applicant Portfolio

Personal academic portfolio, hosted with GitHub Pages at **https://nasibasgar.github.io**

## ✅ To finish setting up (3 things)

1. **Upload your CV** — add your CV PDF to the root of this repository, named exactly:
   `Nasib_Asgar_CV.pdf`
   (Every "Download CV" button on the site downloads this file.)

2. **Upload your photo** — add a square headshot to the root of this repository, named exactly:
   `profile.jpg`
   (Until you do, a simple "NA" monogram is shown — the site still looks fine without it.)

3. **Add your links** — open `links.js` (the only file with links in it). Paste in:
   - `paper` — the ResearchGate URL of your MARTEC 2024 paper (clicking the publication card opens this)
   - `preprint` — the Research Square page of the mobile-money preprint (hidden until you paste it)
   - `researchgate` — your ResearchGate profile URL
   - `linkedin` — your LinkedIn profile URL
   - `email` — change it here if your contact email ever changes (updates everywhere on the page)

That's it. `links.js` is the only place links live; every button on every page reads from it.

## 🌐 Enabling GitHub Pages

Because this repository is named `NasibAsgar.github.io`, GitHub publishes it automatically:

1. Go to the repository **Settings → Pages**
2. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
3. Wait a minute, then visit `https://nasibasgar.github.io`

Use that URL in your emails to professors, e.g. in your signature:
> Portfolio: https://nasibasgar.github.io

## ➕ Adding content later

The site has five pages. Each has ready-to-copy commented templates (search for **TEMPLATE**):

- `publications.html`: new publication, preprint, or manuscript
- `projects.html`: new project (put new simulation projects above the group projects)
- `background.html`: education, skills, experience (including a teaching-assistant template), references
- `research.html`: research statement and interests
- `index.html`: the home page (name, at-a-glance facts, contact)

Edit a file directly on GitHub (open it, click the pencil icon, commit) and the live site
updates within a minute or two.

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | Home page: main info and contact |
| `research.html`, `publications.html`, `projects.html`, `background.html` | The inner pages |
| `style.css`, `site.js` | Shared styling and behaviour |
| `links.js` | All your links and email, in one place |
| `projects/` | Figures and PDF summaries used on the pages |
| `Nasib_Asgar_CV.pdf` | Your CV (you upload this) |
| `profile.jpg` | Your headshot (you upload this, optional) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |
