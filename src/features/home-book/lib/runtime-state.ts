import type { HomeChapterId } from "@/features/home-book/config/chapters";

// Runtime-only state survives soft navigations in the current tab,
// but disappears on a full refresh as requested.
export const homeBookRuntimeState: {
  selectedChapter: HomeChapterId | null;
  motionEnabled: boolean | null;
  touchActivated: boolean;
} = {
  selectedChapter: null,
  motionEnabled: null,
  touchActivated: false,
};
