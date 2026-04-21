export const homeBook3DAssets = {
  hdri: "/home-book/hdris/studio_small_09_2k.hdr",
  textures: {
    cover: {
      color: "/home-book/textures/cover/Leather033A_2K-JPG_Color.jpg",
      normal: "/home-book/textures/cover/Leather033A_2K-JPG_NormalGL.jpg",
      roughness: "/home-book/textures/cover/Leather033A_2K-JPG_Roughness.jpg",
    },
    paper: {
      color: "/home-book/textures/paper/Paper004_2K-JPG_Color.jpg",
      normal: "/home-book/textures/paper/Paper004_2K-JPG_NormalGL.jpg",
      roughness: "/home-book/textures/paper/Paper004_2K-JPG_Roughness.jpg",
    },
    wood: {
      color: "/home-book/textures/wood/Wood051_2K-JPG_Color.jpg",
      normal: "/home-book/textures/wood/Wood051_2K-JPG_NormalGL.jpg",
      roughness: "/home-book/textures/wood/Wood051_2K-JPG_Roughness.jpg",
    },
  },
  overlays: {
    botanical: "/home-book/overlays/botanical-public-domain.png",
    botanicalOrnament: "/home-book/overlays/botanical-ornament-public-domain.png",
    mapScroll: "/home-book/overlays/old-map-scroll-public-domain.png",
  },
  models: {
    encyclopediaSet: "/home-book/models/book_encyclopedia_set_01/book_encyclopedia_set_01_1k.gltf",
    magnifyingGlass: "/home-book/models/magnifying_glass_01/magnifying_glass_01_1k.gltf",
    postcardSet: "/home-book/models/postcard_set_01/postcard_set_01_1k.gltf",
    vintageOilLamp: "/home-book/models/vintage_oil_lamp/vintage_oil_lamp_1k.gltf",
  },
  fallback: {
    desktopPoster: "/home-book/fallback/poster-desktop.webp",
    mobilePoster: "/home-book/fallback/poster-mobile.webp",
  },
} as const;
