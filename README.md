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

## Visitor tracking

The site can log who visits, by network rather than by name. A professor reading it on
campus wifi shows up as their university; someone reading at home shows up as their internet
provider, which tells you the city and state but not the institution. Expect roughly a third
of academic visitors to be identifiable by institution.

Visits land in a Google Sheet called **Portfolio visits, nasibasgar.github.io**, which has a
Summary tab with four tables: universities and institutes, visits by state, every network,
and the 25 most recent visits. The tables fill in on their own.

Nothing is recorded until you finish the three steps below. Until then `analytics.js` does
nothing at all.

1. **Install the script.** Open the spreadsheet, then Extensions, then Apps Script. Delete
   whatever is in the editor, paste the whole contents of `visit-logger.gs` from this
   repository, and save.

2. **Publish it.** Deploy, then New deployment. Click the gear and choose Web app. Set
   "Execute as" to **Me** and "Who has access" to **Anyone**, then Deploy. Google will ask
   you to authorise it; the warning screen is expected for your own script, so choose
   Advanced, then "Go to project", then Allow. Copy the web app URL, which ends in `/exec`.

3. **Point the site at it.** Open `analytics.js` and replace
   `PASTE-YOUR-APPS-SCRIPT-URL-HERE` with that URL. Commit. Then open your site on your
   phone using mobile data, and a row should appear in the sheet within a few seconds.

If you later change `visit-logger.gs`, you must redeploy for it to take effect: Deploy,
Manage deployments, the pencil icon, then set Version to "New version".

### What is recorded, and what is not

Each page view stores the time, the network name and its ASN, the city, state and country,
which page, how many seconds the page was actually in view, how far down it was scrolled,
where the visitor arrived from, the device type and the browser language.

IP addresses are not stored and no cookies are set. Visitors whose browser sends Do Not
Track are skipped, as are obvious bots. The network lookup uses ipapi.co, which is free for
up to 1,000 lookups a day and is called once per visitor per session, not once per page. If
an ad blocker blocks that lookup the visit is still recorded, just without the network name.

The footer carries one line saying the site counts visits by network and region. You can
delete it from the five HTML files if you would rather not show it, though keeping it is the
honest thing to do.

The endpoint URL sits in `analytics.js`, which anyone can read, so in principle a stranger
could post junk rows to your sheet. For a personal site this is not worth defending against,
but it is the reason not to reuse that URL for anything that matters.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page: introduction, at-a-glance facts, contact |
| `research.html`, `publications.html`, `projects.html`, `background.html` | The inner pages |
| `style.css` | All styling, including the dark theme |
| `site.js` | Theme toggle, menu, figure lightbox, the sentiment chart, copy-citation |
| `hull.js` | Draws the ship profile in the home page header |
| `links.js` | Every link and the contact email, in one place |
| `analytics.js` | Logs visits to your Google Sheet (see Visitor tracking) |
| `visit-logger.gs` | The Apps Script half of that, pasted into the spreadsheet |
| `profile.jpg` | Headshot shown in the header |
| `projects/` | Figures and PDF summaries used on the pages |
| `Nasib_Asgar_CV.pdf` | Your CV (you upload this) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
