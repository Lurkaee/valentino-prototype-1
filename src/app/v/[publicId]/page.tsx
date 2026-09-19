import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ExperienceRenderer } from "@/templates/ExperienceRenderer";
import { getTemplateDefinition } from "@/templates/registry";

interface PageProps {
  params: Promise<{ publicId: string }>;
}

export const metadata: Metadata = {
  title: "A Valentine Experience",
  description: "A personal Valentine experience.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "A Valentine Experience",
    description: "A personal Valentine experience.",
    type: "website",
  },
};

export default async function PublicExperiencePage({ params }: PageProps) {
  const { publicId } = await params;

  // Query experience - explicitly ignoring any edit cookies present on the request
  const experience = await db.experience.findUnique({
    where: { publicId },
    select: {
      templateId: true,
      templateVersion: true,
      publishedConfig: true,
      status: true,
    },
  });

  // If experience does not exist, or is still in DRAFT status, return 404
  if (!experience || experience.status === "DRAFT" || !experience.publishedConfig) {
    notFound();
  }

  // If experience is DISABLED or DELETED, middleware intercepts with HTTP 410.
  // As a defense-in-depth fallback in case middleware is bypassed:
  if (experience.status === "DISABLED" || experience.status === "DELETED") {
    notFound();
  }

  let rawConfig: unknown = {};
  try {
    rawConfig = JSON.parse(experience.publishedConfig);
  } catch {
    notFound();
  }

  const template = getTemplateDefinition(experience.templateId, experience.templateVersion);
  if (!template) {
    notFound();
  }

  // Hydration leak prevention: only normalized template props are passed to the client
  const safeConfig = template.normalizeConfig(rawConfig);

  return (
    <main className="min-h-[100dvh] w-full">
      <ExperienceRenderer
        templateId={experience.templateId}
        templateVersion={experience.templateVersion}
        mode="public"
        rawConfig={safeConfig}
      />
    </main>
  );
}
