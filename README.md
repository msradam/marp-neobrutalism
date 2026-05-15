# Neobrutalism for Marp

A Marp theme in the neobrutalist style: thick borders, offset box-shadows with zero blur, flat fills, near-monochromatic palette with one bold accent.

No upstream design system — the tokens are defined directly in `src/build.js`.

## Preview

Run `npm run example` to generate `examples/deck.html`, `examples/deck.pdf`, and `examples/deck.pptx`.

## Quick start

```bash
marp --theme themes/neobrutalism.css deck.md -o deck.html
```

Dark default:

```bash
marp --theme themes/neobrutalism-dark.css deck.md -o deck.html
```

## Per-slide variants

| Class            | Effect                                                   |
| ---------------- | -------------------------------------------------------- |
| `lead`           | Accent-color full-bleed background, bottom-anchored title |
| `split`          | Two-column grid                                          |
| `dark` / `invert`| Black background, white borders and shadows              |
| `accent`         | Yellow content slide for callouts                        |
| `light`          | Force light tokens inside a `neobrutalism-dark` deck     |

## Customizing

```yaml
---
marp: true
theme: neobrutalism
style: |
  section {
    --nb-accent: #ff6b6b;
    --nb-shadow: 6px 6px 0 #000;
  }
---
```

### Tokens

| Token                | Default              | Purpose                    |
| -------------------- | -------------------- | -------------------------- |
| `--nb-bg`            | `#ffffff`            | Slide background           |
| `--nb-layer`         | `#f2f2f2`            | Element backgrounds        |
| `--nb-text`          | `#000000`            | Primary text               |
| `--nb-text-secondary`| `#333333`            | Footer, page numbers       |
| `--nb-border`        | `#000000`            | Border color               |
| `--nb-border-width`  | `2px`                | Border thickness           |
| `--nb-shadow`        | `4px 4px 0 #000000`  | Offset shadow              |
| `--nb-shadow-sm`     | `2px 2px 0 #000000`  | Small offset shadow        |
| `--nb-accent`        | `#f5c842`            | Accent color               |
| `--nb-accent-text`   | `#000000`            | Text on accent background  |
| `--nb-font`          | Space Grotesk        | Sans-serif font stack      |
| `--nb-mono`          | Space Mono           | Monospace font stack       |
| `--nb-pad`           | `60px`               | Slide padding              |

## Files

```
themes/
  neobrutalism.css       # light theme
  neobrutalism-dark.css  # dark default variant
engine/
  index.js               # Mermaid fence renderer + per-slide theming
mermaid/
  index.js               # near-monochromatic Mermaid palette
src/
  build.js               # defines tokens and generates themes/
examples/
  deck.md                # demo deck
  deck.html              # rendered HTML
  deck.pdf               # rendered PDF
  deck.pptx              # rendered PowerPoint
```

## License

MIT.
