# Design System Specification: High-End Editorial

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Curator"**

This design system is built to bridge the gap between technical precision and literary elegance. We are moving away from the "template" look of a standard personal blog toward a bespoke digital publication. The system prioritizes content over container, using intentional asymmetry and a "Typography-First" philosophy.

**The "Digital Curator" aesthetic is defined by:**
- **Intentional Breathing Room:** White space is not "empty"; it is a functional element that directs the eye.
- **Asymmetric Balance:** Instead of centering everything, we use offset columns to create a dynamic, editorial rhythm.
- **Materiality:** Using tonal layering to create a sense of physical paper and glass rather than flat digital pixels.

---

## 2. Colors & Surface Philosophy
The palette is grounded in sophisticated neutrals, using deep indigo and muted teals to provide professional authority without the harshness of pure black or standard "tech" blue.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Placing a `surface-container-low` section against a `surface` background.
2.  **Vertical Rhythm:** Using the spacing scale to create clear separation.
3.  **Tonal Transitions:** Moving from `surface` to `surface-variant`.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Each layer represents a different level of focus.
- **Base Layer (`surface`):** The canvas.
- **Secondary Layer (`surface-container-low`):** For grouping related metadata or sidebar elements.
- **Elevated Layer (`surface-container-highest`):** For high-priority interactive cards.

### Signature Textures: Glass & Gradients
To avoid a "flat" feel, use **Glassmorphism** for navigation and floating panels.
- **Token Usage:** `surface` color at 70% opacity + `backdrop-blur: 12px`.
- **Gradients:** Use a subtle linear gradient from `primary` to `primary-dim` for main CTAs to give them a "machined" and premium feel.

---

## 3. Typography
Typography is the backbone of this system. We use a three-font strategy to differentiate between the "Tech" and "Essay" modes.

| Scale | Font Family | Role |
| :--- | :--- | :--- |
| **Display** | *Newsreader* | The Editorial Voice. Large, high-contrast serif for headers. |
| **Headline** | *Newsreader* | Establishing content hierarchy in long-form essays. |
| **Title** | *Manrope* | Structural clarity. Clean sans-serif for UI elements and card titles. |
| **Body** | *Manrope* | High-readability sans-serif for technical text and descriptions. |
| **Label** | *Space Grotesk* | The "Tech" Accent. Monospaced-leaning for tags, dates, and code. |

**Editorial Contrast:** For essays, pair a `display-lg` (Newsreader) title with wide margins. For tech docs, pair `title-lg` (Manrope) with `label-md` (Space Grotesk) to create a structured, "blueprinted" look.

---

## 4. Elevation & Depth
We eschew traditional drop shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. A card using `surface-container-lowest` placed on a `surface-container-low` background creates a natural "lift" without visual noise.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use a shadow with a 32px blur at 4% opacity, tinted with `on-surface`.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Navigation (The Editorial Masthead)
*   **Style:** Minimalist, fixed to top. Use a `surface` glassmorphism effect.
*   **Interaction:** Active links use a subtle `primary` underline (2px) offset by 8px, or a simple weight shift.

### Cards & Post Previews
*   **Rule:** Forbid divider lines.
*   **Styling:** Use `surface-container-low` for the card body. On hover, transition to `surface-container-high`.
*   **Typography:** Title in `title-lg`, Meta-info (Date/Tags) in `label-sm` (Space Grotesk).

### Specialized Prose Styling
*   **Technical Articles:** Use a rigid grid. 25% width for Table of Contents (ToC), 75% for content. Code blocks use `surface-container-highest` with `spaceGrotesk` labels for language indicators.
*   **Essays:** Single-column, centered (max-width 680px). Pull quotes should use `headline-md` (Newsreader) with an asymmetric 40px left-margin indent—no quote marks, just a subtle `surface-tint` vertical line.

### Buttons & Inputs
*   **Primary Button:** `primary` background with `on-primary` text. Radius: `sm` (0.125rem) for a sharp, architectural look.
*   **Chips (Tags):** `secondary-container` background with `on-secondary-container` text. Use `label-sm` font for a technical feel.
*   **Inputs:** Minimalist under-lines or `surface-container-low` blocks. Focus state uses a 2px `primary` glow.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical margins in essay layouts to create visual interest.
*   **Do** use `on-surface-variant` for secondary text to maintain a soft contrast ratio that reduces eye strain.
*   **Do** toggle between *Newsreader* and *Manrope* to signal a change in content "mood" (e.g., editorial vs. utility).

### Don't:
*   **Don't** use 1px solid borders. Use background color steps (`surface` -> `surface-container-low`) instead.
*   **Don't** use pure black (#000000) for Dark Mode. Use the `surface` and `on-background` tokens which are tuned to deep charcoals.
*   **Don't** use standard "drop shadows" on cards. Rely on the Spacing Scale and Tonal Layering to define hierarchy.
*   **Don't** center-align long-form body text. Always use left-alignment for readability.