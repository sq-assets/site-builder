# Site Builder

Squarespace 7.1: visitors build their dream website in three steps. They pick their **industry**, drag in the **features** they need, then choose a **style**, and a laptop builds and restyles a little website as they go. At the end they get a named result (e.g. "The Gilded Lens") with your email signup and a call-to-action button.

Every option is a blog post, so you add, rename or remove options in Squarespace with no code.

## 1. Three blogs (can be hidden / Not Linked, or in a dropdown)

| Blog (default URL) | One post per | Post title | Post text (first line) |
|---|---|---|---|
| `/site-builder-industries` | industry | shown on the button, e.g. *Photographer* | the result's last word, e.g. *Lens*. Blank = built-in word |
| `/site-builder-features` | feature | e.g. *Portfolio*; the laptop draws a matching section for portfolio, shop, services/bookings, blog, podcast, courses/memberships (anything else gets a generic section) | not used |
| `/site-builder-styles` | style | e.g. *Luxury*; the laptop restyles for luxury, minimal, editorial, quirky, maximalist, colourful/bold | the result's first word, e.g. *Gilded* |

Result title = **The [style word] [industry word]**. Options show in the order you published them (`data-order="newest"` to flip).

## 2. Footer code injection

```html
<!-- Site Builder -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sq-assets/site-builder@v1.2.0/effect.css">
<script src="https://cdn.jsdelivr.net/gh/sq-assets/site-builder@v1.2.0/effect.js"></script>
```

## 3. Code Block where you want it

```html
<div class="site-builder"
  data-industries="/site-builder-industries"
  data-features="/site-builder-features"
  data-styles="/site-builder-styles"
  data-logo="Your Name"
  data-cta-text="Let's build it"
  data-cta-url="/contact"
  data-color="#383838"
  data-background="#f8f7f6"></div>
```

Make the Code Block wide (most of the section) so the laptop has room.

## 4. Email signup (optional)

Add a **Newsletter Block** (or a **Form Block**) to the **same section** as the Code Block. On the live site it disappears from its spot and appears in the result, under the visitor's title. Emails go wherever that block is connected (Squarespace Email Campaigns, Mailchimp etc.).

To save each visitor's result with their email, use a Form Block with an extra text field labelled **Your site**: it's filled in automatically and hidden. In the editor the block stays where you put it.

## Settings

| Setting | What it does |
|---|---|
| `data-industries`, `data-features`, `data-styles` | The three blogs |
| `data-order` | `oldest` (default, order you published) or `newest` |
| `data-question1/2/3`, `data-hint1/2/3`, `data-step1/2/3` | Step wording |
| `data-logo`, `data-placeholder`, `data-hero-button` | Text on the laptop's mini site |
| `data-result-intro`, `data-result-heading`, `data-result-hint`, `data-finish-text` | Result wording |
| `data-cta-text`, `data-cta-url` | The result button |
| `data-uppercase` | `on` (default) = options in capitals; `off` = as typed |
| `data-color`, `data-background` | Your ink and paper colours (buttons, pills) |
| `data-fonts` | `off` = don't load the style fonts (Playfair Display, DM Sans, Shrikhand, Space Mono) |
| `data-show-result-field` | `on` = show the filled-in "Your site" form field |

The result is also saved in `sessionStorage` (`site-builder`) and fired as a `sitebuilder:done` event, for connecting other tools.
