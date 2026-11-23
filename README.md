# Site Builder

**v2.1:** the result is a **profile** that opens underneath the builder: a business profile card (their picks, their industry + how a custom site helps, each feature, their style, effects that suit them), a **Book a design brainstorm** card and an **Email me some design ideas** card (holds a Newsletter/Form Block from the same section; hidden if there isn't one). Settings: `data-profile-heading`, `data-profile-intro`, `data-brainstorm-title`, `data-brainstorm-text`, `data-ideas-title`, `data-ideas-text`, `data-effects-max` (4), `data-card` colour via `--sb-card`.

**v2:** the laptop is a showcase (it rotates your effects, plus any extra images from `data-showcase`), and the result is a **recap**: where they're at (industry pain points), what you'd focus on (a suggestion per feature + a style note) and a reminder that every site is unique, then **Get your starting-point quote**, **Want an opinion on your current site?**, the email signup and Pinterest / Instagram follow links. `data-laptop="build"` brings back the v1 behaviour where the screen builds as they pick.

Squarespace 7.1: visitors build their dream website in three steps. They pick their **industry**, drag in the **features** they need, then choose a **style**, and a laptop builds and restyles a little website as they go. At the end they get a named result (e.g. "The Gilded Lens") with your email signup and a call-to-action button.

Every option is a blog post, so you add, rename or remove options in Squarespace with no code.

## 1. Three blogs (can be hidden / Not Linked, or in a dropdown)

| Blog (default URL) | One post per | Post title | Post text (first line) |
|---|---|---|---|
| `/site-builder-industries` | industry | shown on the button, e.g. *Photographer* | the result's last word, e.g. *Lens*. Blank = built-in word |
| `/site-builder-features` | feature | e.g. *Portfolio*; the laptop draws a matching section for portfolio, shop, services/bookings, blog, podcast, courses/memberships (anything else gets a generic section) | not used |
| `/site-builder-styles` | style | e.g. *Luxury*; the laptop restyles for luxury, minimal, editorial, quirky, maximalist, colourful/bold | the result's first word, e.g. *Gilded* |

Result title = **The [style word] [industry word]**.

**Tailored write-up:** the result explains what their site would be like, built from their answers: a line about their industry, a line about their style and the features they picked, then a closing line. Built-in copy for each industry and style; to rewrite one, put your own text in that industry or style post's **excerpt**.

**Use your own designs:** give a feature post a **thumbnail image** (a screenshot of a real section you've designed, or an animated WebP) and the laptop shows that instead of the drawn version. Give a style post a thumbnail (the top of a real homepage in that style: nav + hero) and it replaces the laptop's top when that style is picked. Posts without a thumbnail keep the drawn version.

**Your effects per style:** tag posts in your effects blog (`data-effects`, default `/effects`) with style names (`luxury`, `minimal`, `editorial`, `quirky`, `maximalist`, `colourful`). When a visitor picks a style, the top of the laptop becomes a slideshow of the matching effects' thumbnails (animated WebPs play), and the result lists them as links. `data-effects="off"` to turn off, `data-effect-speed` = ms per slide (3200).

**A version per style:** in a feature post's body, add one image per style and put the style's name in the file name, alt text or caption (e.g. `portfolio-luxury.png`, `portfolio-colourful.png`). When a visitor picks that style, the section swaps to it. Styles without their own image keep the thumbnail. Matching uses the first word of the style post's title (luxury, minimal, editorial, quirky, maximalist, colourful). Options show in the order you published them (`data-order="newest"` to flip).

## 2. Footer code injection

```html
<!-- Site Builder -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sq-assets/site-builder@v2.1.0/effect.css">
<script src="https://cdn.jsdelivr.net/gh/sq-assets/site-builder@v2.1.0/effect.js"></script>
```

## 3. Code Block where you want it

```html
<div class="site-builder"
  data-industries="/site-builder-industries"
  data-features="/site-builder-features"
  data-styles="/site-builder-styles"
  data-font="aktiv-grotesk"
  data-logo="Your Name"
  data-cta-text="Get a quote"
  data-cta-url="/contact"
  data-color="#383838"
  data-background="#f8f7f6"></div>
```

Make the Code Block wide (most of the section) so the laptop has room.

## 4. Email signup (optional)

Add a **Newsletter Block** (or a **Form Block**) to the **same section** as the Code Block. On the live site it disappears from its spot and appears in the result, under the visitor's title. Emails go wherever that block is connected (Squarespace Email Campaigns, Mailchimp etc.).

To save each visitor's result with their email, use a Form Block with an extra text field labelled **Your site**: it's filled in automatically and hidden. In the editor the block stays where you put it.

### Mailing list per industry (Squarespace Email Campaigns)
Make one mailing list per industry, then add one **Newsletter Block** per industry to the site builder's section, each connected to its list and with its **title set to the industry name** (e.g. *Photographer*). On the live page they're all hidden, and the visitor's industry block appears under their result (its title is replaced by `data-signup-title`). A block whose title isn't an industry is used as the fallback.

## Settings

| Setting | What it does |
|---|---|
| `data-industries`, `data-features`, `data-styles` | The three blogs |
| `data-order` | `oldest` (default, order you published) or `newest` |
| `data-question1/2/3`, `data-hint1/2/3`, `data-step1/2/3` | Step wording |
| `data-logo`, `data-placeholder`, `data-hero-button` | Text on the laptop's mini site |
| `data-result-intro`, `data-result-heading`, `data-result-hint`, `data-finish-text` | Result wording |
| `data-signup-title`, `data-signup-text` | Heading and text shown on the signup in the result (`keep` = block's own title) |
| `data-cta-text`, `data-cta-url` | The result button (`Get a quote`, `/contact`) |
| `data-features-intro`, `data-closing` | Wording around the tailored write-up |
| `data-font`, `data-option-size`, `data-option-size-mobile` | Font for the options (e.g. `aktiv-grotesk`) and their size (`.7rem`, phones `.66rem`) |
| `data-laptop-image`, `data-screen` | Use your own laptop photo (front-on; a transparent screen area works best, the mini site shows through it) and where its screen is, as `top right bottom left` in % of the image (e.g. `6 12 14 12`) |
| `data-uppercase` | `on` (default) = options in capitals; `off` = as typed |
| `data-glow`, `data-glow-color` | `on` (default) = orange glow when an option is picked, on picked options and on the laptop; colour `#ED6A5E` |
| `data-hover-color` | Hover / picked colour for options and buttons (`#E8A6D6`) |
| `data-color`, `data-background` | Your ink and paper colours (buttons, pills) |
| `data-fonts` | `off` = don't load the style fonts (Playfair Display, DM Sans, Shrikhand, Space Mono) |
| `data-show-result-field` | `on` = show the filled-in "Your site" form field |

The result is also saved in `sessionStorage` (`site-builder`) and fired as a `sitebuilder:done` event, for connecting other tools.
