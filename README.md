# Greenwood Public School — Website

A responsive, single-page website for a K-12 school, built with plain HTML, CSS, and JavaScript. No build tools required.

## Run locally

```bash
cd school-website
python3 -m http.server 4180
# then open http://localhost:4180
```

Or just open `index.html` directly in a browser.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | All page content and sections |
| `styles.css` | Styling, theme tokens, and responsive layout |
| `script.js` | Mobile nav, admission form handling, footer year |

## Sections

- **Home** — hero with stats and call-to-action
- **About** — mission, vision, and values
- **Academics** — programs from Pre-Primary to Senior School
- **Admissions** — process steps + working enquiry form
- **Gallery** — campus life tiles
- **Events** — upcoming news and events
- **Contact** — address, phone, email, map, and Facebook/Instagram links

## Customize

- **School name / details:** search & replace "Greenwood Public School" and the address/phone/email in `index.html`.
- **Colors:** edit the CSS variables under `:root` in `styles.css` (e.g. `--green-600`, `--gold`).
- **Social links:** update the `href="https://facebook.com"` and `href="https://instagram.com"` links (Contact section + footer).
- **Gallery photos:** the tiles use CSS gradients as placeholders. To use real photos, replace each `figure` background with `background-image: url('assets/your-photo.jpg')`.
- **Form:** `script.js` currently shows a success message only. To actually receive enquiries, POST the form data to your backend or an email service (e.g. Formspree).
