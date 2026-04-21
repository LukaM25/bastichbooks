import { getHomepageData } from "@/features/books/queries";
import { HomeBookExperience } from "@/features/home-book/components/home-book-experience";

export default async function HomePage() {
  const { featuredBooks, latestBooks } = await getHomepageData();

  return <HomeBookExperience featuredBooks={featuredBooks} latestBooks={latestBooks} />;
}
