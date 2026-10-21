# Pub Arka Sarajevo · Pubarka.ba

A responsive one-page website for Pub Arka in Sarajevo, built with static HTML, CSS, and JavaScript. It can be hosted without a build step. Pushing to `main` deploys to production on Vercel.

## Structure

- `index.html`, `styles.css`, `script.js` — the current site (arch-themed design, October 2026).
- `pubarka 1/` — backup of the previous version of the site. It opens on its own and is excluded from the Vercel deploy via `.vercelignore`.

## Preview

Open `index.html` in a browser or serve this folder with a static web server.

## Content notes

- Address, telephone, email, and opening hours are shown as published on Pub Arka's public Facebook and Instagram profiles. The same hours drive the live "Otvoreno / Zatvoreno" status in `script.js` and the structured data in `index.html` — update all three together.
- Draught beer prices are taken from the chalkboard in front of the pub (see `assets/images/pubarka-frontage.jpg`). Verify the prices and glass size whenever the board changes.
- Coffee and food are described without prices; current promotions are linked to Instagram.
- Photos are real photos of the pub. The album lives in `assets/images/album/` as `<name>-800.jpg` (grid) and `<name>-lg.jpg` (lightbox); several are also used in the hero, story, menu and Atmosfera sections. To add a photo, export both sizes and add an `<li>` to the `.gallery` list in `index.html` (`g-wide`, `g-tall` or `g-band` controls its tile shape).
- The logo is `assets/images/arka-logo-480.png` / `arka-logo-960.png`: the original gold-on-black logo cropped, with the black made transparent. `og-pub-arka.jpg` is the 1200×630 social-media preview image.
- `pubarka-live-music.jpg` (generated), `pubarka-tuborg.jpg`, the larger PNG originals and the unused `pub-arka-*` JPEG variants in `assets/images/` are no longer loaded by the page.
- Domain and Open Graph metadata use `pubarka.ba`.
