# Nasib Asgar — Ph.D. Applicant Portfolio

Personal academic portfolio, hosted with GitHub Pages at **https://nasibasgar.github.io**

## ✅ To finish setting up (3 things)

1. **Upload your CV** — add your CV PDF to the root of this repository, named exactly:
   `Nasib_Asgar_CV.pdf`
   (Every "Download CV" button on the site downloads this file.)

2. **Upload your photo** — add a square headshot to the root of this repository, named exactly:
   `profile.jpg`
   (Until you do, a simple "NA" monogram is shown — the site still looks fine without it.)

3. **Add your links** — open `index.html` and find the block near the top of `<body>` marked
   **"✏️ EDIT YOUR LINKS HERE"**. Paste in:
   - `paper` — the ResearchGate URL of your MARTEC 2024 paper (clicking the publication card opens this)
   - `researchgate` — your ResearchGate profile URL
   - `linkedin` — your LinkedIn profile URL
   - `email` — change it here if your contact email ever changes (updates everywhere on the page)

That's it — this is the only place links live; every button on the page reads from it.

## 🌐 Enabling GitHub Pages

Because this repository is named `NasibAsgar.github.io`, GitHub publishes it automatically:

1. Go to the repository **Settings → Pages**
2. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
3. Wait a minute, then visit `https://nasibasgar.github.io`

Use that URL in your emails to professors, e.g. in your signature:
> Portfolio: https://nasibasgar.github.io

## ➕ Adding content later

`index.html` contains ready-to-copy commented templates (search for **"✏️ TEMPLATE"**):

- **New publication** — in the *Research & projects* section; copy the template, paste the paper URL into its `href`
- **New research project** — same section
- **New experience** — in the *Experience & engagement* section

Edit the file directly on GitHub (open `index.html` → pencil icon → commit), and the live site
updates within a minute or two.

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | The whole site — content, styling, and scripts in one file |
| `Nasib_Asgar_CV.pdf` | Your CV (you upload this) |
| `profile.jpg` | Your headshot (you upload this) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |
