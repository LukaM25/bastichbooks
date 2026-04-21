import { EditorialChapterPage } from "@/features/public-pages/components/editorial-chapter-page";
import { editorialPages } from "@/features/public-pages/config/editorial-pages";

export default function FragmentsPage() {
  return <EditorialChapterPage config={editorialPages.fragmente} />;
}
