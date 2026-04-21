import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { BookStatus, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to run the seed script.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL),
});

async function main() {
  const passwordHash = await hash("dombastich", 10);

  const [admin, reader] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@bastichbooks.com" },
      update: {
        name: "Dom Bastich",
        passwordHash,
        role: Role.ADMIN,
      },
      create: {
        email: "admin@bastichbooks.com",
        name: "Dom Bastich",
        passwordHash,
        role: Role.ADMIN,
      },
    }),
    prisma.user.upsert({
      where: { email: "reader@bastichbooks.com" },
      update: {
        name: "House Reader",
        passwordHash,
        role: Role.READER,
      },
      create: {
        email: "reader@bastichbooks.com",
        name: "House Reader",
        passwordHash,
        role: Role.READER,
      },
    }),
  ]);

  const categoryInputs = [
    {
      name: "Novels",
      slug: "novels",
      description: "Long-form literary fiction with intimate, haunted atmospheres.",
    },
    {
      name: "Essays",
      slug: "essays",
      description: "Reflections, notes, and personal criticism from the Bastich study.",
    },
    {
      name: "Fragments",
      slug: "fragments",
      description: "Shorter pieces, dispatches, and carefully bound remnants.",
    },
  ];

  const categories = await Promise.all(
    categoryInputs.map((category) =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category,
      }),
    ),
  );

  const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]));

  const books = [
    {
      title: "The Orchard at Vesper",
      slug: "the-orchard-at-vesper",
      subtitle: "A novel of inheritance, weather, and unfinished letters",
      shortDescription:
        "A son returns to an olive estate at dusk and finds a private history pressed into ledgers, fruit crates, and the silences between meals.",
      description:
        "When Elias Bastich comes home to settle the remnants of his father's neglected orchard, he discovers a family archive threaded through invoices, seed catalogs, and half-addressed letters. The estate begins to speak back to him through weather, labor, and the slow grammar of old rooms. The Orchard at Vesper is a tactile novel about inheritance, land, and the impossible desire to edit a family into coherence.",
      featuredQuote:
        "Evening arrived not as light fading, but as the house remembering itself.",
      priceInCents: 1800,
      pageCount: 286,
      status: BookStatus.PUBLISHED,
      featured: true,
      publishedAt: new Date("2026-02-14T12:00:00.000Z"),
      releaseDate: new Date("2026-02-14T12:00:00.000Z"),
      categorySlugs: ["novels"],
    },
    {
      title: "Margins for the Fire",
      slug: "margins-for-the-fire",
      subtitle: "Essays on domestic rituals and private mythologies",
      shortDescription:
        "A gathering of essays on rooms, rituals, grief, reading habits, and the small liturgies that keep private lives from going dark.",
      description:
        "In these essays Dom Bastich turns toward the objects that remain after the dramatic event is gone: the cooling stove, the dog-eared atlas, the note left in a coat pocket. Margins for the Fire is an intimate nonfiction collection about the emotional architecture of homes, books, and recurring gestures. It moves with a critic's precision and a novelist's ear for pressure inside an ordinary scene.",
      featuredQuote:
        "The room did not heal us, but it taught us how to stay arranged around the wound.",
      priceInCents: 1400,
      pageCount: 212,
      status: BookStatus.PUBLISHED,
      featured: true,
      publishedAt: new Date("2026-01-06T12:00:00.000Z"),
      releaseDate: new Date("2026-01-06T12:00:00.000Z"),
      categorySlugs: ["essays"],
    },
    {
      title: "Low Lamps, Open Windows",
      slug: "low-lamps-open-windows",
      subtitle: "Fragments and nocturnes",
      shortDescription:
        "A volume of fragments, scenes, and aphoristic night pieces written for windows, train stations, and sleepless kitchens.",
      description:
        "Low Lamps, Open Windows collects the shorter work of Dom Bastich into a single discreetly luminous edition. These fragments move from diary-like weather reports to dialogue shards, literary miniatures, and meditations on memory's tendency to rearrange itself at night. The collection reads like a box of annotated postcards recovered from the same winter.",
      priceInCents: 1100,
      pageCount: 164,
      status: BookStatus.PUBLISHED,
      featured: false,
      publishedAt: new Date("2025-12-18T12:00:00.000Z"),
      releaseDate: new Date("2025-12-18T12:00:00.000Z"),
      categorySlugs: ["fragments", "essays"],
    },
    {
      title: "Lantern Notes for the Absent City",
      slug: "lantern-notes-for-the-absent-city",
      subtitle: "Upcoming draft",
      shortDescription:
        "A draft still in editorial assembly, waiting in the private back room of the house.",
      description:
        "This draft remains unpublished so the storefront can demonstrate true database-driven publishing. Once marked live from the admin dashboard, it will automatically appear across the homepage and books listing without any code changes.",
      priceInCents: 1700,
      pageCount: 244,
      status: BookStatus.DRAFT,
      featured: false,
      categorySlugs: ["novels", "fragments"],
    },
  ];

  for (const book of books) {
    const existing = await prisma.book.upsert({
      where: { slug: book.slug },
      update: {
        title: book.title,
        subtitle: book.subtitle,
        shortDescription: book.shortDescription,
        description: book.description,
        featuredQuote: book.featuredQuote,
        priceInCents: book.priceInCents,
        pageCount: book.pageCount,
        status: book.status,
        featured: book.featured,
        publishedAt: book.publishedAt,
        releaseDate: book.releaseDate,
      },
      create: {
        title: book.title,
        slug: book.slug,
        subtitle: book.subtitle,
        shortDescription: book.shortDescription,
        description: book.description,
        featuredQuote: book.featuredQuote,
        priceInCents: book.priceInCents,
        pageCount: book.pageCount,
        status: book.status,
        featured: book.featured,
        publishedAt: book.publishedAt,
        releaseDate: book.releaseDate,
      },
    });

    await prisma.bookCategory.deleteMany({
      where: { bookId: existing.id },
    });

    await prisma.bookCategory.createMany({
      data: book.categorySlugs.map((slug) => ({
        bookId: existing.id,
        categoryId: categoryBySlug[slug].id,
      })),
      skipDuplicates: true,
    });
  }

  const orchard = await prisma.book.findUniqueOrThrow({
    where: { slug: "the-orchard-at-vesper" },
  });

  const initialOrder = await prisma.order.upsert({
    where: {
      stripeCheckoutSessionId: "seed-session-orchard",
    },
    update: {
      status: "PAID",
      subtotalInCents: orchard.priceInCents,
      paidAt: new Date("2026-02-15T10:30:00.000Z"),
      userId: reader.id,
    },
    create: {
      userId: reader.id,
      status: "PAID",
      subtotalInCents: orchard.priceInCents,
      stripeCheckoutSessionId: "seed-session-orchard",
      paidAt: new Date("2026-02-15T10:30:00.000Z"),
    },
  });

  await prisma.orderItem.upsert({
    where: { id: "seed-order-item-orchard" },
    update: {
      orderId: initialOrder.id,
      bookId: orchard.id,
      unitAmountInCents: orchard.priceInCents,
      titleSnapshot: orchard.title,
      slugSnapshot: orchard.slug,
    },
    create: {
      id: "seed-order-item-orchard",
      orderId: initialOrder.id,
      bookId: orchard.id,
      unitAmountInCents: orchard.priceInCents,
      titleSnapshot: orchard.title,
      slugSnapshot: orchard.slug,
    },
  });

  await prisma.wishlistItem.upsert({
    where: {
      userId_bookId: {
        userId: reader.id,
        bookId: orchard.id,
      },
    },
    update: {},
    create: {
      userId: reader.id,
      bookId: orchard.id,
    },
  });

  console.log("Seed complete:", { adminEmail: admin.email, readerEmail: reader.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
