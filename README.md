# Nasib Asgar, Ph.D. applicant portfolio

Personal academic portfolio, hosted with GitHub Pages at **https://nasibasgar.github.io**

## Still to do

1. **Upload your CV.** Add your CV PDF to the root of this repository, named exactly
   `Nasib_Asgar_CV.pdf`. Every "Download CV" button on the site points at that file.

2. **Add a Google Scholar link**, once you have a profile. Open `links.js` and replace the
   `scholar` value. Until then the Scholar row stays hidden, which is why you will not see
   it on the contact list.

Everything else is in place. Your headshot is `profile.jpg`; replace that file with another
square image to change it. Your ResearchGate profile, the MARTEC 2024 paper and your LinkedIn
are already live in `links.js`, which is the only file that holds links.

The `preprint` entry is deliberately left on a placeholder, so the "Preprint on Research
Square" link stays hidden on the publications page. Paste a URL there if you ever want it
shown. That is the general rule: any value containing the word PASTE is hidden on the live
site, along with its row, so a half-finished link is never shown to a professor.

## GitHub Pages

The repository is named `NasibAsgar.github.io`, so GitHub publishes it automatically.
If it is not live yet: Settings, then Pages, then set Source to "Deploy from a branch",
branch `main`, folder `/ (root)`. The site appears at https://nasibasgar.github.io within
a minute or two of each push.

## Adding content later

Five pages, each with commented templates you can copy. Search any file for TEMPLATE.

- `projects.html` has three sections: capstone project, data analysis, and simulation.
  New COMSOL and CFD work goes in the simulation section.
- `publications.html` for a new paper, preprint, or manuscript.
- `background.html` for education, skills, experience and references. It also holds a
  template for teaching or tutoring experience, which matters for assistantship decisions.
- `research.html` for the research statement and interests.
- `index.html` for the home page: name, at-a-glance facts, and contact.

You can edit a file straight on GitHub. Open it, click the pencil, commit, and the live
site updates on its own.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page: introduction, at-a-glance facts, contact |
| `research.html`, `publications.html`, `projects.html`, `background.html` | The inner pages |
| `style.css` | All styling, including the dark theme |
| `site.js` | Theme toggle, menu, figure lightbox, the sentiment chart, copy-citation |
| `hull.js` | Draws the ship profile in the home page header |
| `links.js` | Every link and the contact email, in one place |
| `profile.jpg` | Headshot shown in the header |
| `projects/` | Figures and PDF summaries used on the pages |
| `Nasib_Asgar_CV.pdf` | Your CV (you upload this) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
