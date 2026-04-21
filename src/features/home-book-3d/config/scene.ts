export const homeBook3DScene = {
  camera: {
    fov: 29,
    position: [0, 1.82, 8] as const,
  },
  book: {
    rotation: [-0.18, 0.02, 0.02] as const,
    hoverRotationRange: 0.08,
    touchRotationRange: 0.08,
  },
  lighting: {
    ambient: 0.9,
    key: 1.65,
    fill: 0.62,
    rim: 0.28,
  },
  post: {
    bloomLuminanceThreshold: 0.78,
    bloomIntensity: 0.18,
    vignetteDarkness: 0.44,
  },
} as const;
