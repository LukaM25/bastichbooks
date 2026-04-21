# Home Book 3D Scaffold

This feature folder is reserved for the WebGL-driven homepage rewrite.

## Intended Responsibilities
- `config/`
  Asset paths, scene constants, and chapter-to-scene mappings
- `components/`
  Thin scene pieces such as canvas wrapper, book shell, pages, overlays, and controls
- `hooks/`
  Pointer interaction, motion preference, and scene state hooks
- `types/`
  Explicit scene and interaction types

## Notes
- Keep route files thin and mount the 3D scene from `src/app/page.tsx`.
- Avoid a single giant scene component. Split geometry, motion, and content mapping.
- Use `docs/ASSET_SOURCES.md` as the source-of-truth for externally sourced files.
