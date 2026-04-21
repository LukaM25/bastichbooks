import { redirect } from "next/navigation";

export default async function LegacyBookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/buecher/${slug}`);
}
