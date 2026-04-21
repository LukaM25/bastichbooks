# Bastich Books 3D Asset Sources

This document tracks externally sourced homepage assets for the future WebGL-driven archival book landing.

## Source Policy
- Prefer `CC0` assets wherever possible.
- Use `Public Domain` assets only when provenance is explicit on the source page.
- Avoid unclear “free for personal/commercial use” resources with vague terms.
- Keep downloaded files small enough for local development unless a higher resolution is actually required.

## Downloaded Assets

### Lighting HDRI
- File: `public/home-book/hdris/studio_small_09_2k.hdr`
- Source: Poly Haven
- License: CC0
- Source page: https://polyhaven.com/a/studio_small_09
- Direct file: https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_09_2k.hdr
- Why selected:
  Soft studio lighting with warm controllable artificial light, useful as a neutral base for a desk-lit editorial scene.

### Paper Texture Set
- Files:
  - `public/home-book/textures/paper/Paper004_2K-JPG_Color.jpg`
  - `public/home-book/textures/paper/Paper004_2K-JPG_NormalGL.jpg`
  - `public/home-book/textures/paper/Paper004_2K-JPG_Roughness.jpg`
- Source: ambientCG
- License: CC0
- Source page: https://ambientcg.com/view?id=Paper004
- Download archive: https://ambientcg.com/get?file=Paper004_2K-JPG.zip
- Why selected:
  Warm brown paper that is closer to handled archival stock than bright modern white.

### Desk Wood Texture Set
- Files:
  - `public/home-book/textures/wood/Wood051_2K-JPG_Color.jpg`
  - `public/home-book/textures/wood/Wood051_2K-JPG_NormalGL.jpg`
  - `public/home-book/textures/wood/Wood051_2K-JPG_Roughness.jpg`
- Source: ambientCG
- License: CC0
- Source page: https://ambientcg.com/view?id=Wood051
- Download archive: https://ambientcg.com/get?file=Wood051_2K-JPG.zip
- Why selected:
  Dark polished wood that reads closer to a walnut writing desk than lighter rustic planks.

### Cover Leather Texture Set
- Files:
  - `public/home-book/textures/cover/Leather033A_2K-JPG_Color.jpg`
  - `public/home-book/textures/cover/Leather033A_2K-JPG_NormalGL.jpg`
  - `public/home-book/textures/cover/Leather033A_2K-JPG_Roughness.jpg`
- Source: ambientCG
- License: CC0
- Source page: https://ambientcg.com/view?id=Leather033A
- Download archive: https://ambientcg.com/get?file=Leather033A_2K-JPG.zip
- Why selected:
  Brown leather with enough grain and warmth to read as a handled archival cover instead of flat painted green.

### Botanical Overlay
- File: `public/home-book/overlays/botanical-public-domain.png`
- Source: FreeSVG
- License: Public Domain
- Source page: https://freesvg.org/botanical-2015120941
- Direct file: https://freesvg.org/img/Botanical-2015120941.png
- Why selected:
  Suitable as a projected botanical silhouette or layered archival plate.

### Botanical Ornament Overlay
- File: `public/home-book/overlays/botanical-ornament-public-domain.png`
- Source: FreeSVG
- License: Public Domain
- Source page: https://freesvg.org/botanical-ornament
- Direct file: https://freesvg.org/img/botanical-ornament-01.png
- Why selected:
  Useful for subtle decorative edging, teaser motifs, or page ornament experiments.

### Travel / Scroll Overlay
- File: `public/home-book/overlays/old-map-scroll-public-domain.png`
- Source: FreeSVG
- License: Public Domain
- Source page: https://freesvg.org/old-map-scroll
- Direct file: https://freesvg.org/img/160303_scroll.png
- Why selected:
  Useful as a travel-notes / archival-scroll visual layer during concepting.

### Vintage Oil Lamp Model
- Files:
  - `public/home-book/models/vintage_oil_lamp/vintage_oil_lamp_1k.gltf`
  - `public/home-book/models/vintage_oil_lamp/vintage_oil_lamp.bin`
  - `public/home-book/models/vintage_oil_lamp/textures/*`
- Source: Poly Haven
- License: CC0
- Source page: https://polyhaven.com/a/vintage_oil_lamp
- Why selected:
  Gives the desk scene a believable warm theatrical light source that fits the authorial, historical, and archival tone better than an industrial task lamp.

### Magnifying Glass Model
- Files:
  - `public/home-book/models/magnifying_glass_01/magnifying_glass_01_1k.gltf`
  - `public/home-book/models/magnifying_glass_01/magnifying_glass_01.bin`
  - `public/home-book/models/magnifying_glass_01/textures/*`
- Source: Poly Haven
- License: CC0
- Source page: https://polyhaven.com/a/magnifying_glass_01
- Why selected:
  Reinforces the archive / study / exploration mood and gives the desk a legible scholarly prop on the left side.

### Encyclopedia Book Set Model
- Files:
  - `public/home-book/models/book_encyclopedia_set_01/book_encyclopedia_set_01_1k.gltf`
  - `public/home-book/models/book_encyclopedia_set_01/book_encyclopedia_set_01.bin`
  - `public/home-book/models/book_encyclopedia_set_01/textures/*`
- Source: Poly Haven
- License: CC0
- Source page: https://polyhaven.com/a/book_encyclopedia_set_01
- Why selected:
  Adds visual trust and “personal archive” weight without competing with the interactive hero book.

### Postcard / Travel Notes Model
- Files:
  - `public/home-book/models/postcard_set_01/postcard_set_01_1k.gltf`
  - `public/home-book/models/postcard_set_01/postcard_set_01.bin`
  - `public/home-book/models/postcard_set_01/textures/*`
- Source: Poly Haven
- License: CC0
- Source page: https://polyhaven.com/a/postcard_set_01
- Why selected:
  Introduces travel-note detail and helps the desk feel lived in rather than staged.

## Still Needed

### Hero Book Model
- Status: still bespoke rather than externally sourced
- Recommendation:
  Keep the interactive hero book custom unless a very specific licensed model is found that matches the page-layout interaction.
- Why:
  The book needs custom page surfaces for DOM chapter content and controlled page-turn animation, which generic external book models do not solve cleanly.

### Embossed Cover Detailing
- Status: not authored yet
- Recommendation:
  Add a custom embossed title / foil mask on top of the sourced leather base.
- Why:
  The texture quality is now there, but the hero cover still needs a more proprietary Bastich Books identity layer.

### Chapter World Backdrops
- Status: not externally sourced yet
- Recommendation:
  Create or source one lightweight background/overlay per chapter:
  - `buecher`
  - `ueber-dom`
  - `orte`
  - `heilkunst`
  - `fragmente`
  - `bibliothek`
- Why:
  Each chapter needs its own world without forcing a totally different 3D scene.

### Fallback Posters
- Status: not externally sourced yet
- Recommendation:
  Render and export:
  - `poster-desktop.webp`
  - `poster-mobile.webp`
- Why:
  The homepage needs graceful fallback for WebGL failure, reduced motion, or initial loading.

## Reproducible Fetch
- Script: `scripts/fetch-home-book-assets.sh`
- Purpose:
  Re-download the sourced CC0/Public Domain assets without relying on terminal history.
