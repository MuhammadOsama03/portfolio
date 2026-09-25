# Contributing

## Local preview

Run the site from a local HTTP server so routes and static assets behave like deployment:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Required checks

Before merging a change:

```bash
python scripts/check_site.py
```

Then verify the home page and 404 page at mobile and desktop widths. Test navigation using only a keyboard, confirm the menu closes with Escape, check visible focus, and review the reduced-motion experience.

## Content rules

Project descriptions should be specific and verifiable. Confirm every repository and contact link, provide useful alternative text for informative images, and avoid committing private contact details, analytics identifiers, or secrets.

## Scope

Keep the site dependency-light and progressively enhanced. New tooling should solve a documented maintenance or user-experience problem rather than duplicate the existing static workflow.
