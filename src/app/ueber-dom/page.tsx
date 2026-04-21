import { EditorialChapterPage } from "@/features/public-pages/components/editorial-chapter-page";
import { editorialPages } from "@/features/public-pages/config/editorial-pages";

export default function AboutDomPage() {
  return <EditorialChapterPage config={editorialPages["ueber-dom"]} />;
}
