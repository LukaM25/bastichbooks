import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await prisma.book.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/buecher"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/ueber-dom"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/orte"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/heilkunst"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/fragmente"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/bibliothek"),
      lastModified: new Date(),
    },
    ...books.map((book) => ({
      url: absoluteUrl(`/buecher/${book.slug}`),
      lastModified: book.updatedAt,
    })),
  ];
}
