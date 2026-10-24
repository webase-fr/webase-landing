import { getService, services } from "@/content/services";
import { ogSize, renderOgImage } from "@/lib/og-image";
export const alt = "Webase — services de développement web à Orléans";
export const size = ogSize;
export const contentType = "image/png";
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export default async function ServiceOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug)!;
  return renderOgImage({
    label: `${service.shortName.toUpperCase()} · ORLÉANS`,
    title: service.title[0],
    accent: service.title[1],
    footer: `${service.metaTitle} · webase.fr`,
  });
}
